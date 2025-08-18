import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { updateSessionActivity } from '@/lib/session-helpers';

// POST /api/sessions/activity - Update session activity
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { sessionToken, lastPage } = body;

    if (!sessionToken) {
      return NextResponse.json({ error: 'Session token required' }, { status: 400 });
    }

    await updateSessionActivity(sessionToken, lastPage);
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Session activity update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}