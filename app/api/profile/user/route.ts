import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';

export async function GET(request: Request) {
  try {
    // Get the current session to identify the user
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      return NextResponse.json({ success: false, error: 'MONGODB_URI not configured' }, { status: 500 });
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('PopCycle');

    // Find the user by email
    const user = await db.collection('users').findOne({ email: session.user.email });
    
    await client.close();

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        orgId: user.orgId,
        location: user.location,
        skillLevel: user.skillLevel,
        itemsAssembled: user.itemsAssembled || 0,
        totalHoursLogged: user.totalHoursLogged || 0,
        favoriteProducts: user.favoriteProducts || [],
        assemblyStories: user.assemblyStories || [],
        permissions: user.permissions || [],
        assignedRoutes: user.assignedRoutes || [],
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch user profile'
    }, { status: 500 });
  }
}