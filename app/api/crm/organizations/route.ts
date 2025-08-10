import { NextRequest, NextResponse } from 'next/server'
import { MongoClient, ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()
    const db = client.db('PopCycle')
    
    const organizations = await db.collection('orgs').find({}).toArray()
    
    await client.close()
    
    return NextResponse.json(organizations)
  } catch (error) {
    console.error('Error fetching organizations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch organizations' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()
    const db = client.db('PopCycle')
    
    const newOrganization = {
      _id: new ObjectId(),
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/\s+/g, ''),
      type: body.type,
      description: body.description,
      logoUrl: body.logoUrl || '',
      contactInfo: {
        email: body.email || '',
        phone: body.phone || '',
        address: body.address || '',
        website: body.website || ''
      },
      branding: {
        primaryColor: body.primaryColor || '',
        secondaryColor: body.secondaryColor || '',
        logoS3Key: body.logoS3Key || '',
        customDomain: body.customDomain || '',
        trackingPageMessage: body.trackingPageMessage || ''
      },
      events: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await db.collection('orgs').insertOne(newOrganization)
    
    await client.close()
    
    return NextResponse.json({ 
      success: true, 
      organizationId: result.insertedId,
      organization: newOrganization
    })
  } catch (error) {
    console.error('Error creating organization:', error)
    return NextResponse.json(
      { error: 'Failed to create organization' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()
    const db = client.db('PopCycle')
    
    const { _id, ...updateData } = body
    updateData.updatedAt = new Date()
    
    const result = await db.collection('orgs').updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    )
    
    await client.close()
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating organization:', error)
    return NextResponse.json(
      { error: 'Failed to update organization' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orgId = searchParams.get('id')
    
    if (!orgId) {
      return NextResponse.json(
        { error: 'Organization ID required' },
        { status: 400 }
      )
    }
    
    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()
    const db = client.db('PopCycle')
    
    const result = await db.collection('orgs').deleteOne({
      _id: new ObjectId(orgId)
    })
    
    await client.close()
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting organization:', error)
    return NextResponse.json(
      { error: 'Failed to delete organization' },
      { status: 500 }
    )
  }
}