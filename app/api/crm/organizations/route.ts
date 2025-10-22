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
    
    // Build base organization object
    const newOrganization: any = {
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
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Add only the type-specific object matching current orgType
    const orgType = body.orgType || 'community_partner'
    if (orgType === 'community_partner' && body.communityPartner) {
      newOrganization.communityPartner = body.communityPartner
    } else if (orgType === 'limited_client' && body.limitedClient) {
      newOrganization.limitedClient = {
        ...body.limitedClient,
        contractStartDate: body.limitedClient.contractStartDate ? new Date(body.limitedClient.contractStartDate) : undefined,
        contractEndDate: body.limitedClient.contractEndDate ? new Date(body.limitedClient.contractEndDate) : undefined
      }
    } else if (orgType === 'retainer_client' && body.retainerClient) {
      newOrganization.retainerClient = {
        ...body.retainerClient,
        contractStartDate: body.retainerClient.contractStartDate ? new Date(body.retainerClient.contractStartDate) : undefined,
        contractEndDate: body.retainerClient.contractEndDate ? new Date(body.retainerClient.contractEndDate) : undefined
      }
    } else if (orgType === 'wholesaler' && body.wholesaler) {
      newOrganization.wholesaler = {
        ...body.wholesaler,
        exclusivityExpirationDate: body.wholesaler.exclusivityExpirationDate ? new Date(body.wholesaler.exclusivityExpirationDate) : undefined
      }
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
    
    const { _id, communityPartner, limitedClient, retainerClient, wholesaler, ...baseUpdateData } = body
    
    // Convert date strings to Date objects
    if (baseUpdateData.lastContactDate) {
      baseUpdateData.lastContactDate = new Date(baseUpdateData.lastContactDate)
    }
    if (baseUpdateData.nextActionDate) {
      baseUpdateData.nextActionDate = new Date(baseUpdateData.nextActionDate)
    }
    
    // Convert activity dates to Date objects
    if (baseUpdateData.activities && Array.isArray(baseUpdateData.activities)) {
      baseUpdateData.activities = baseUpdateData.activities.map((activity: any) => ({
        ...activity,
        date: activity.date ? new Date(activity.date) : new Date(),
        nextActionDate: activity.nextActionDate ? new Date(activity.nextActionDate) : undefined
      }))
    }
    
    baseUpdateData.updatedAt = new Date()

    // Build the $set object with base fields
    const setObject: any = { ...baseUpdateData }

    // Add only the type-specific object matching current orgType
    const orgType = body.orgType
    if (orgType === 'community_partner' && communityPartner) {
      setObject.communityPartner = communityPartner
    } else if (orgType === 'limited_client' && limitedClient) {
      setObject.limitedClient = {
        ...limitedClient,
        contractStartDate: limitedClient.contractStartDate ? new Date(limitedClient.contractStartDate) : undefined,
        contractEndDate: limitedClient.contractEndDate ? new Date(limitedClient.contractEndDate) : undefined
      }
    } else if (orgType === 'retainer_client' && retainerClient) {
      setObject.retainerClient = {
        ...retainerClient,
        contractStartDate: retainerClient.contractStartDate ? new Date(retainerClient.contractStartDate) : undefined,
        contractEndDate: retainerClient.contractEndDate ? new Date(retainerClient.contractEndDate) : undefined
      }
    } else if (orgType === 'wholesaler' && wholesaler) {
      setObject.wholesaler = {
        ...wholesaler,
        exclusivityExpirationDate: wholesaler.exclusivityExpirationDate ? new Date(wholesaler.exclusivityExpirationDate) : undefined
      }
    }
    
    const result = await db.collection('orgs').updateOne(
      { _id: new ObjectId(_id) },
      { $set: setObject }
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