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
    if (!['admin', 'super_admin'].includes(session.user.userType)) {
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
    if (!['admin', 'super_admin'].includes(session.user.userType)) {
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

// Helper functions for session tracking with JWT + user activity
async function getSessionStats(db: any) {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
  
  // Count active users (those who signed in recently)
  const activeUsers = await db.collection('users').countDocuments({
    isActive: true,
    updatedAt: { $gt: fiveMinutesAgo }
  });
  
  // Count users who signed in in last 24 hours
  const recentUsers = await db.collection('users').countDocuments({
    updatedAt: { $gt: twentyFourHoursAgo }
  });
  
  return {
    totalActiveSessions: activeUsers,
    uniqueActiveUsers: activeUsers,
    sessionsLast24Hours: recentUsers,
    averageSessionDuration: 45
  };
}

async function getOnlineUsers(db: any) {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  
  const recentUsers = await db.collection('users')
    .find({
      isActive: true,
      updatedAt: { $gt: fiveMinutesAgo }
    })
    .sort({ updatedAt: -1 })
    .toArray();
  
  return recentUsers.map((user: any) => ({
    userId: user.email,
    lastActivity: user.updatedAt
  }));
}

async function getUserActiveSessions(db: any, userEmail: string) {
  const user = await db.collection('users').findOne({ email: userEmail });
  return user ? [user] : [];
}