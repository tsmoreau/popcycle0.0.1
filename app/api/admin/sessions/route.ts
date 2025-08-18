import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { 
  getUserActiveSessions, 
  getOnlineUsers, 
  getSessionStats,
  forceLogoutAllUserSessions,
  cleanupExpiredSessions 
} from '@/lib/session-helpers';
import { ObjectId } from 'mongodb';

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

    switch (action) {
      case 'stats':
        const stats = await getSessionStats();
        return NextResponse.json(stats);
        
      case 'online':
        const onlineUsers = await getOnlineUsers();
        return NextResponse.json(onlineUsers);
        
      case 'user-sessions':
        const userId = searchParams.get('userId');
        if (!userId || !ObjectId.isValid(userId)) {
          return NextResponse.json({ error: 'Valid userId required' }, { status: 400 });
        }
        const userSessions = await getUserActiveSessions(new ObjectId(userId));
        return NextResponse.json(userSessions);
        
      default:
        const sessionStats = await getSessionStats();
        const currentOnlineUsers = await getOnlineUsers();
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
    const { action, userId } = body;

    switch (action) {
      case 'force-logout-user':
        if (!userId || !ObjectId.isValid(userId)) {
          return NextResponse.json({ error: 'Valid userId required' }, { status: 400 });
        }
        const loggedOutSessions = await forceLogoutAllUserSessions(new ObjectId(userId));
        return NextResponse.json({ 
          message: `Logged out ${loggedOutSessions} sessions for user`,
          sessionsLoggedOut: loggedOutSessions 
        });
        
      case 'cleanup-expired':
        const cleanedUpSessions = await cleanupExpiredSessions();
        return NextResponse.json({ 
          message: `Cleaned up ${cleanedUpSessions} expired sessions`,
          sessionsCleanedUp: cleanedUpSessions 
        });
        
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
    
  } catch (error) {
    console.error('Session management error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}