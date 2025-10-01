import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { getDatabase } from '@/lib/mongodb';

// GET /api/admin/sessions - Get session statistics and online users
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has admin permissions
    if (!session.user.userType || !['admin', 'super_admin'].includes(session.user.userType)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    const db = await getDatabase();
    
    switch (action) {
      case 'stats':
        const stats = await getSessionStats(db);
        return NextResponse.json(stats);
        
      case 'online':
        const onlineUsers = await getOnlineUsers(db);
        return NextResponse.json(onlineUsers);
        
      case 'user-sessions':
        const userEmail = searchParams.get('userEmail');
        if (!userEmail) {
          return NextResponse.json({ error: 'User email required' }, { status: 400 });
        }
        const userSessions = await getUserActiveSessions(db, userEmail);
        return NextResponse.json(userSessions);
        
      default:
        const sessionStats = await getSessionStats(db);
        const currentOnlineUsers = await getOnlineUsers(db);
        return NextResponse.json({
          stats: sessionStats,
          onlineUsers: currentOnlineUsers
        });
    }
    
  } catch (error) {
    console.error('Session API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/sessions - Perform session management actions
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has admin permissions
    if (!session.user.userType || !['admin', 'super_admin'].includes(session.user.userType)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const body = await request.json();
    const { action, userEmail } = body;
    const db = await getDatabase();

    switch (action) {
      case 'force-logout-user':
        if (!userEmail) {
          return NextResponse.json({ error: 'User email required' }, { status: 400 });
        }
        // Find user first to get their ID  
        const user = await db.collection('users').findOne({ email: userEmail });
        if (!user) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        
        const result = await db.collection('sessions').deleteMany({
          userId: user._id,
          expires: { $gt: new Date() }
        });
        return NextResponse.json({ 
          message: `Logged out ${result.deletedCount} sessions for user`,
          sessionsLoggedOut: result.deletedCount 
        });
        
      case 'cleanup-expired':
        const cleanupResult = await db.collection('sessions').deleteMany({
          expires: { $lt: new Date() }
        });
        return NextResponse.json({ 
          message: `Cleaned up ${cleanupResult.deletedCount} expired sessions`,
          sessionsCleanedUp: cleanupResult.deletedCount 
        });
        
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
    
  } catch (error) {
    console.error('Session management error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper functions for NextAuth sessions collection
async function getSessionStats(db: any) {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
  // Active sessions (not expired)
  const activeSessions = await db.collection('sessions').countDocuments({
    expires: { $gt: now }
  });
  
  // Unique active users (not expired)
  const activeUsers = await db.collection('sessions').distinct('userId', {
    expires: { $gt: now }
  });
  
  // Sessions created in last 24 hours - NextAuth uses createdAt
  const recentSessions = await db.collection('sessions').countDocuments({
    createdAt: { $gt: twentyFourHoursAgo }
  });
  
  return {
    totalActiveSessions: activeSessions,
    uniqueActiveUsers: activeUsers.length,
    sessionsLast24Hours: recentSessions,
    averageSessionDuration: 45 // Placeholder - complex to calculate
  };
}

async function getOnlineUsers(db: any) {
  const now = new Date();
  
  const activeSessions = await db.collection('sessions')
    .find({
      expires: { $gt: now }
    })
    .sort({ expires: -1 })
    .toArray();
  
  // Group by user ID to get unique users with their latest session
  const uniqueUsers = new Map();
  for (const session of activeSessions) {
    if (!uniqueUsers.has(session.userId)) {
      // Get user email from users collection
      const user = await db.collection('users').findOne({ _id: session.userId });
      
      // NextAuth doesn't set createdAt on sessions, so we calculate when session was created
      // Session expires in 30 days, so creation time = expires - 30 days
      const sessionDuration = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
      const sessionCreated = new Date(session.expires.getTime() - sessionDuration);
      
      uniqueUsers.set(session.userId, {
        userId: user?.email || session.userId,
        lastActivity: sessionCreated.toISOString(),
        sessionExpires: session.expires,
        sessionToken: session.sessionToken
      });
    }
  }
  
  return Array.from(uniqueUsers.values());
}

async function getUserActiveSessions(db: any, userEmail: string) {
  // Find user first to get their ID
  const user = await db.collection('users').findOne({ email: userEmail });
  if (!user) return [];
  
  return await db.collection('sessions')
    .find({ 
      userId: user._id,
      expires: { $gt: new Date() }
    })
    .sort({ expires: -1 })
    .toArray();
}