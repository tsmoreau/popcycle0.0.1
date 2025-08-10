import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// Function to determine collection type from QR code
function getCollectionType(qrCode: string): 'bin' | 'batch' | 'blank' | null {
  if (qrCode.length < 4) return null;
  
  // Extract type from the 4th character (e.g., "000B12345" -> "B")
  const typeChar = qrCode.charAt(3);
  
  switch (typeChar) {
    case 'B': return 'bin';
    case 'T': return 'batch';
    case 'K': return 'blank';
    default: return null;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      return NextResponse.json({ error: 'Database configuration error' }, { status: 500 });
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('PopCycle');
    
    // Determine which collection to search based on QR code type
    const collectionType = getCollectionType(id);
    
    if (!collectionType) {
      await client.close();
      return NextResponse.json({ error: 'Invalid QR code format' }, { status: 400 });
    }
    
    let record;
    let org;
    
    if (collectionType === 'bin') {
      // Look up bin record
      record = await db.collection('bins').findOne({ _id: id });
      if (record) {
        org = await db.collection('orgs').findOne({ _id: record.orgId });
      }
      
      if (!record) {
        await client.close();
        return NextResponse.json({ error: 'Bin not found' }, { status: 404 });
      }
      
      await client.close();
      return NextResponse.json({
        id: record._id,
        type: 'bin',
        name: record.name,
        location: record.location,
        capacity: record.capacity,
        isActive: record.isActive,
        canBeAdopted: record.canBeAdopted,
        adoptedBy: record.adoptedBy,
        lastCollectionDate: record.lastCollectionDate,
        nextCollectionDate: record.nextCollectionDate,
        organization: org ? {
          name: org.name,
          type: org.type,
          description: org.description,
          branding: org.branding
        } : null,
        message: org?.branding?.trackingPageMessage || 'This bin is part of our circular economy program.',
        impactMetrics: {
          carbonSaved: 0, // Bins don't have direct impact yet
          wasteReduced: 0
        }
      });
      
    } else if (collectionType === 'batch') {
      // Look up batch record
      record = await db.collection('batches').findOne({ _id: id });
      if (record) {
        const bin = await db.collection('bins').findOne({ _id: record.binId });
        if (bin) {
          org = await db.collection('orgs').findOne({ _id: bin.orgId });
        }
      }
      
      if (!record) {
        await client.close();
        return NextResponse.json({ error: 'Batch not found' }, { status: 404 });
      }
      
      await client.close();
      return NextResponse.json({
        id: record._id,
        type: 'batch',
        binId: record.binId,
        collectionDate: record.collectionDate,
        weight: record.weight,
        materialType: record.materialType,
        collectedBy: record.collectedBy,
        status: record.status,
        notes: record.notes,
        organization: org ? {
          name: org.name,
          type: org.type,
          description: org.description,
          branding: org.branding
        } : null,
        message: org?.branding?.trackingPageMessage || 'This plastic has been collected and is being processed.',
        impactMetrics: {
          carbonSaved: record.weight * 2.3, // Rough calculation
          wasteReduced: record.weight
        }
      });
      
    } else if (collectionType === 'blank') {
      // Look up blank record
      record = await db.collection('blanks').findOne({ _id: id });
      if (record) {
        const batch = await db.collection('batches').findOne({ _id: record.batchId });
        if (batch) {
          const bin = await db.collection('bins').findOne({ _id: batch.binId });
          if (bin) {
            org = await db.collection('orgs').findOne({ _id: bin.orgId });
          }
        }
      }
      
      if (!record) {
        await client.close();
        return NextResponse.json({ error: 'Blank not found' }, { status: 404 });
      }
      
      // Get user details if assigned
      let userDetails = null;
      if (record.userId) {
        userDetails = await db.collection('users').findOne({ _id: record.userId });
      }
      
      await client.close();
      return NextResponse.json({
        id: record._id,
        type: 'blank',
        batchId: record.batchId,
        productId: record.productId,
        userId: record.userId,
        itemType: record.type,
        status: record.status,
        weight: record.weight,
        assemblyDate: record.assemblyDate,
        deliveryDate: record.deliveryDate,
        makerDetails: userDetails ? {
          name: userDetails.name,
          location: userDetails.location || 'Unknown',
          assemblyDate: record.assemblyDate?.toISOString() || null,
          story: `Assembled by ${userDetails.name}`,
          verifiedEmail: userDetails.email
        } : null,
        organization: org ? {
          name: org.name,
          type: org.type,
          description: org.description,
          branding: org.branding
        } : null,
        message: org?.branding?.trackingPageMessage || 'This item represents the transformation of waste into useful products.',
        impactMetrics: {
          carbonSaved: record.weight * 3.5, // Higher impact for finished items
          wasteReduced: record.weight
        }
      });
    }
    
  } catch (error) {
    console.error('Error tracking item:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}