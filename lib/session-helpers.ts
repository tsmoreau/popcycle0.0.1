import { getDatabase } from './mongodb';
import { Session } from './schemas';
import { ObjectId } from 'mongodb';

// Helper function to parse user agent for device/browser info
function parseUserAgent(userAgent: string): {
  deviceType: 'desktop' | 'mobile' | 'tablet' | 'unknown';
  browser: string;
} {
  const ua = userAgent.toLowerCase();
  
  // Device detection
  let deviceType: 'desktop' | 'mobile' | 'tablet' | 'unknown' = 'unknown';
  if (ua.includes('mobile') && !ua.includes('tablet')) {
    deviceType = 'mobile';
  } else if (ua.includes('tablet') || ua.includes('ipad')) {
    deviceType = 'tablet';
  } else if (ua.includes('desktop') || ua.includes('windows') || ua.includes('macintosh') || ua.includes('linux')) {
    deviceType = 'desktop';
  }
  
  // Browser detection
  let browser = 'Unknown';
  if (ua.includes('chrome') && !ua.includes('edge')) {
    browser = 'Chrome';
  } else if (ua.includes('firefox')) {
    browser = 'Firefox';
  } else if (ua.includes('safari') && !ua.includes('chrome')) {
    browser = 'Safari';
  } else if (ua.includes('edge')) {
    browser = 'Edge';
  } else if (ua.includes('opera')) {
    browser = 'Opera';
  }
  
  return { deviceType, browser };
}

// Create a new session record
export async function createSession(
  userId: ObjectId,
  sessionToken: string,
  ipAddress: string,
  userAgent: string
): Promise<Session> {
  const db = await getDatabase();
  const { deviceType, browser } = parseUserAgent(userAgent);
  
  const newSession: Omit<Session, '_id'> = {
    userId,
    sessionToken,
    ipAddress,
    userAgent,
    deviceType,
    browser,
    createdAt: new Date(),
    lastActivity: new Date(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    isActive: true,
    pageViews: 1,
    lastPage: '/',
    loginMethod: 'google'
  };
  
  const result = await db.collection('sessions').insertOne(newSession);
  return {
    _id: result.insertedId,
    ...newSession
  };
}

// Update session activity (call on each page visit/API call)
export async function updateSessionActivity(
  sessionToken: string,
  lastPage?: string
): Promise<void> {
  const db = await getDatabase();
  
  const updateData: any = {
    lastActivity: new Date(),
    $inc: { pageViews: 1 }
  };
  
  if (lastPage) {
    updateData.lastPage = lastPage;
  }
  
  await db.collection('sessions').updateOne(
    { sessionToken, isActive: true },
    updateData
  );
}

// Mark session as inactive (sign out)
export async function deactivateSession(
  sessionToken: string,
  logoutReason: 'manual' | 'expired' | 'forced' = 'manual'
): Promise<void> {
  const db = await getDatabase();
  
  await db.collection('sessions').updateOne(
    { sessionToken },
    {
      $set: {
        isActive: false,
        loggedOutAt: new Date(),
        logoutReason
      }
    }
  );
}

// Get active sessions for a user
export async function getUserActiveSessions(userId: ObjectId): Promise<Session[]> {
  const db = await getDatabase();
  
  return await db.collection('sessions')
    .find({ 
      userId, 
      isActive: true,
      expiresAt: { $gt: new Date() } // Not expired
    })
    .sort({ lastActivity: -1 })
    .toArray() as Session[];
}

// Get all currently online users (active sessions in last 5 minutes)
export async function getOnlineUsers(): Promise<{ userId: ObjectId, lastActivity: Date }[]> {
  const db = await getDatabase();
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  
  const activeSessions = await db.collection('sessions')
    .find({
      isActive: true,
      lastActivity: { $gt: fiveMinutesAgo }
    })
    .toArray() as Session[];
  
  // Group by userId to get unique users
  const uniqueUsers = new Map();
  activeSessions.forEach(session => {
    const userId = session.userId.toString();
    if (!uniqueUsers.has(userId) || session.lastActivity > uniqueUsers.get(userId).lastActivity) {
      uniqueUsers.set(userId, { userId: session.userId, lastActivity: session.lastActivity });
    }
  });
  
  return Array.from(uniqueUsers.values());
}

// Force logout all sessions for a user (security action)
export async function forceLogoutAllUserSessions(userId: ObjectId): Promise<number> {
  const db = await getDatabase();
  
  const result = await db.collection('sessions').updateMany(
    { userId, isActive: true },
    {
      $set: {
        isActive: false,
        loggedOutAt: new Date(),
        logoutReason: 'forced'
      }
    }
  );
  
  return result.modifiedCount;
}

// Clean up expired sessions (run periodically)
export async function cleanupExpiredSessions(): Promise<number> {
  const db = await getDatabase();
  
  const result = await db.collection('sessions').updateMany(
    { 
      isActive: true,
      expiresAt: { $lt: new Date() }
    },
    {
      $set: {
        isActive: false,
        loggedOutAt: new Date(),
        logoutReason: 'expired'
      }
    }
  );
  
  return result.modifiedCount;
}

// Get session statistics for admin dashboard
export async function getSessionStats(): Promise<{
  totalActiveSessions: number;
  uniqueActiveUsers: number;
  sessionsLast24Hours: number;
  averageSessionDuration: number;
}> {
  const db = await getDatabase();
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
  // Active sessions
  const activeSessions = await db.collection('sessions')
    .find({ isActive: true, expiresAt: { $gt: now } })
    .toArray() as Session[];
  
  // Unique active users
  const uniqueActiveUsers = new Set(activeSessions.map(s => s.userId.toString())).size;
  
  // Sessions created in last 24 hours
  const recentSessions = await db.collection('sessions')
    .countDocuments({ createdAt: { $gt: twentyFourHoursAgo } });
  
  // Calculate average session duration from completed sessions
  const completedSessions = await db.collection('sessions')
    .find({ 
      loggedOutAt: { $exists: true },
      createdAt: { $gt: twentyFourHoursAgo }
    })
    .toArray() as Session[];
  
  const totalDuration = completedSessions.reduce((sum, session) => {
    if (session.loggedOutAt && session.createdAt) {
      return sum + (session.loggedOutAt.getTime() - session.createdAt.getTime());
    }
    return sum;
  }, 0);
  
  const averageSessionDuration = completedSessions.length > 0 
    ? Math.round(totalDuration / completedSessions.length / 1000 / 60) // in minutes
    : 0;
  
  return {
    totalActiveSessions: activeSessions.length,
    uniqueActiveUsers,
    sessionsLast24Hours: recentSessions,
    averageSessionDuration
  };
}