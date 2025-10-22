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
    
    // Normalize activity dates
    const normalizedActivities = (body.activities || []).map((activity: any) => ({
      ...activity,
      date: activity.date ? new Date(activity.date) : new Date(),
      nextActionDate: activity.nextActionDate ? new Date(activity.nextActionDate) : undefined
    }))
    
    const newOrganization = {
      _id: new ObjectId(),
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/\s+/g, ''),
      orgType: body.orgType || 'community_partner',
      description: body.description,
      contactInfo: body.contactInfo || {
        email: body.email || '',
        phone: body.phone || '',
        address: body.address || '',
        website: body.website || ''
      },
      branding: body.branding || {
        primaryColor: body.primaryColor || '',
        secondaryColor: body.secondaryColor || '',
        logoUrl: body.logoUrl || '',
        logoS3Key: body.logoS3Key || '',
        customDomain: body.customDomain || '',
        trackingPageMessage: body.trackingPageMessage || ''
      },
      status: body.status || 'prospect',
      internalNotes: body.internalNotes || '',
      activities: normalizedActivities,
      lastContactDate: body.lastContactDate ? new Date(body.lastContactDate) : null,
      nextActionDate: body.nextActionDate ? new Date(body.nextActionDate) : null,
      assignedTo: body.assignedTo || '',
      eventIds: body.eventIds || [],
      ...(body.communityPartner && { communityPartner: body.communityPartner }),
      ...(body.limitedClient && { 
        limitedClient: {
          ...body.limitedClient,
          contractStartDate: body.limitedClient.contractStartDate ? new Date(body.limitedClient.contractStartDate) : undefined,
          contractEndDate: body.limitedClient.contractEndDate ? new Date(body.limitedClient.contractEndDate) : undefined
        }
      }),
      ...(body.retainerClient && { 
        retainerClient: {
          ...body.retainerClient,
          contractStartDate: body.retainerClient.contractStartDate ? new Date(body.retainerClient.contractStartDate) : undefined,
          contractEndDate: body.retainerClient.contractEndDate ? new Date(body.retainerClient.contractEndDate) : undefined
        }
      }),
      ...(body.wholesaler && { 
        wholesaler: {
          ...body.wholesaler,
          exclusivityExpirationDate: body.wholesaler.exclusivityExpirationDate ? new Date(body.wholesaler.exclusivityExpirationDate) : undefined
        }
      }),
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
    
    // Convert date strings to Date objects
    if (updateData.lastContactDate) {
      updateData.lastContactDate = new Date(updateData.lastContactDate)
    }
    if (updateData.nextActionDate) {
      updateData.nextActionDate = new Date(updateData.nextActionDate)
    }
    
    // Convert activity dates to Date objects
    if (updateData.activities && Array.isArray(updateData.activities)) {
      updateData.activities = updateData.activities.map((activity: any) => ({
        ...activity,
        date: activity.date ? new Date(activity.date) : new Date(),
        nextActionDate: activity.nextActionDate ? new Date(activity.nextActionDate) : undefined
      }))
    }
    
    // Convert type-specific date fields
    if (updateData.limitedClient) {
      if (updateData.limitedClient.contractStartDate) {
        updateData.limitedClient.contractStartDate = new Date(updateData.limitedClient.contractStartDate)
      }
      if (updateData.limitedClient.contractEndDate) {
        updateData.limitedClient.contractEndDate = new Date(updateData.limitedClient.contractEndDate)
      }
    }
    
    if (updateData.retainerClient) {
      if (updateData.retainerClient.contractStartDate) {
        updateData.retainerClient.contractStartDate = new Date(updateData.retainerClient.contractStartDate)
      }
      if (updateData.retainerClient.contractEndDate) {
        updateData.retainerClient.contractEndDate = new Date(updateData.retainerClient.contractEndDate)
      }
    }
    
    if (updateData.wholesaler?.exclusivityExpirationDate) {
      updateData.wholesaler.exclusivityExpirationDate = new Date(updateData.wholesaler.exclusivityExpirationDate)
    }
    
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