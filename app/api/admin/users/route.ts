import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  try {
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    const db = client.db('PopCycle');
    
    const users = await db.collection('users').find({}).toArray();
    
    await client.close();
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    const db = client.db('PopCycle');
    
    const { _id, ...updateData } = body;
    
    // Convert orgId to ObjectId if it exists and is a valid ObjectId string
    if (updateData.orgId && typeof updateData.orgId === 'string' && ObjectId.isValid(updateData.orgId)) {
      updateData.orgId = new ObjectId(updateData.orgId);
    }
    
    updateData.updatedAt = new Date();
    
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );
    
    await client.close();
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    const db = client.db('PopCycle');
    
    const result = await db.collection('users').deleteOne({
      _id: new ObjectId(id)
    });
    
    await client.close();
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    const db = client.db('PopCycle');
    
    const newUser = {
      _id: new ObjectId(),
      name: body.name,
      email: body.email,
      userType: body.userType || 'user',
      orgId: body.orgId ? new ObjectId(body.orgId) : undefined,
      location: body.location,
      skillLevel: body.skillLevel || 'beginner',
      itemsAssembled: body.itemsAssembled || 0,
      totalHoursLogged: body.totalHoursLogged || 0,
      favoriteProducts: body.favoriteProducts || [],
      assemblyStories: body.assemblyStories || [],
      permissions: body.permissions || [],
      assignedRoutes: body.assignedRoutes || [],
      isActive: body.isActive !== undefined ? body.isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('users').insertOne(newUser);
    
    await client.close();
    
    return NextResponse.json({
      success: true,
      userId: result.insertedId,
      user: newUser
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}