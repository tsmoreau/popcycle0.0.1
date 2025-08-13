import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDatabase } from '../../../../lib/mongodb';
import { Bin, Batch, Blank } from '../../../../lib/schemas';

// Function to determine collection type from QR code
function getCollectionType(qrCode: string): 'bin' | 'batch' | 'blank' | null {
  if (qrCode.length < 1) return null;
  
  // Extract type from the first character (e.g., "B1234567" -> "B")
  const typeChar = qrCode.charAt(0);
  
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
    const db = await getDatabase();
    
    // Determine which collection to search based on QR code type
    const collectionType = getCollectionType(id);
    
    if (!collectionType) {
      return NextResponse.json({ error: 'Invalid QR code format' }, { status: 400 });
    }
    
    let record: Bin | Batch | Blank | null = null;
    let org: any = null;
    
    if (collectionType === 'bin') {
      // Look up bin record using string ID (QR code)
      record = await db.collection('bins').findOne({ _id: id } as any) as Bin | null;
      if (record) {
        try {
          org = await db.collection('orgs').findOne({ _id: new ObjectId((record as Bin).orgId) });
        } catch (error) {
          // Try looking up with string ID if ObjectId conversion fails
          org = await db.collection('orgs').findOne({ _id: (record as Bin).orgId });
        }
      }
      
      if (!record) {
        return NextResponse.json({ error: 'Bin not found' }, { status: 404 });
      }
      
      // Find event information if bin has an eventId
      let eventInfo = null;
      if ((record as Bin).eventId && org && org.events) {
        eventInfo = org.events.find((event: any) => event.eventId === (record as Bin).eventId);
      }
      
      const binRecord = record as Bin;
      return NextResponse.json({
        id: binRecord._id,
        type: 'bin',
        name: binRecord.name,
        location: binRecord.location,
        capacity: binRecord.capacity,
        isActive: binRecord.isActive,
        status: binRecord.status,
        canBeAdopted: binRecord.canBeAdopted,
        adoptedBy: binRecord.adoptedBy,
        collectionDate: binRecord.lastCollectionDate,
        lastCollectionDate: binRecord.lastCollectionDate,
        nextCollectionDate: binRecord.nextCollectionDate,
        eventId: binRecord.eventId,
        event: eventInfo ? eventInfo.name : null,
        organization: org ? {
          name: org.name,
          type: org.type,
          description: org.description,
          branding: org.branding
        } : null,
        message: binRecord.message || org?.branding?.trackingPageMessage || 'This bin is part of our circular economy program.',
        impactMetrics: {
          carbonSaved: 0, // Bins don't have direct impact yet
          wasteReduced: 0
        }
      });
      
    } else if (collectionType === 'batch') {
      // Look up batch record using string ID (QR code)
      record = await db.collection('batches').findOne({ _id: id } as any) as Batch | null;
      if (record) {
        // Get the first bin for organization lookup (batches can come from multiple bins)
        const batchRecord = record as Batch;
        if (batchRecord.binIds && batchRecord.binIds.length > 0) {
          const bin = await db.collection('bins').findOne({ _id: batchRecord.binIds[0] } as any) as Bin | null;
          if (bin) {
            org = await db.collection('orgs').findOne({ _id: new ObjectId(bin.orgId) });
          }
        }
      }
      
      if (!record) {
        return NextResponse.json({ error: 'Batch not found' }, { status: 404 });
      }
      
      // Find event information if batch has an eventId
      let eventInfo = null;
      const batchRecord = record as Batch;
      if (batchRecord.eventId && org && org.events) {
        eventInfo = org.events.find((event: any) => event.eventId === batchRecord.eventId);
      }
      
      return NextResponse.json({
        id: batchRecord._id,
        type: 'batch',
        binIds: batchRecord.binIds || [],
        collectionDate: batchRecord.collectionDate,
        weight: batchRecord.weight,
        materialType: batchRecord.materialType,
        collectedBy: batchRecord.collectedBy,
        status: batchRecord.status,
        eventId: batchRecord.eventId,
        event: eventInfo ? eventInfo.name : null,
        notes: batchRecord.notes,
        organization: org ? {
          name: org.name,
          type: org.type,
          description: org.description,
          branding: org.branding
        } : null,
        message: org?.branding?.trackingPageMessage || 'This plastic has been collected and is being processed.',
        impactMetrics: {
          carbonSaved: batchRecord.weight * 2.3, // Rough calculation
          wasteReduced: batchRecord.weight
        }
      });
      
    } else if (collectionType === 'blank') {
      // Look up blank record using string ID (QR code)
      record = await db.collection('blanks').findOne({ _id: id } as any) as Blank | null;
      let batch: Batch | null = null;
      if (record) {
        const blankRecord = record as Blank;
        batch = await db.collection('batches').findOne({ _id: blankRecord.batchId } as any) as Batch | null;
        if (batch) {
          // Get the first bin for organization lookup (batches can come from multiple bins)
          if (batch.binIds && batch.binIds.length > 0) {
            const bin = await db.collection('bins').findOne({ _id: batch.binIds[0] } as any) as Bin | null;
            if (bin) {
              org = await db.collection('orgs').findOne({ _id: new ObjectId(bin.orgId) });
            }
          }
        }
      }
      
      if (!record) {
        return NextResponse.json({ error: 'Blank not found' }, { status: 404 });
      }
      
      // Get user details if assigned
      let userDetails = null;
      const blankRecord = record as Blank;
      if (blankRecord.userId) {
        userDetails = await db.collection('users').findOne({ _id: new ObjectId(blankRecord.userId) });
      }
      
      return NextResponse.json({
        id: blankRecord._id,
        type: 'blank',
        batchId: blankRecord.batchId,
        binIds: batch ? batch.binIds : [], // Include the bin IDs from the batch
        productId: blankRecord.productId,
        userId: blankRecord.userId,
        itemType: blankRecord.type,
        status: blankRecord.status,
        weight: blankRecord.weight,
        assemblyDate: blankRecord.assemblyDate,
        deliveryDate: blankRecord.deliveryDate,
        makerDetails: userDetails ? {
          name: userDetails.name,
          location: userDetails.location || 'Unknown',
          assemblyDate: blankRecord.assemblyDate?.toISOString() || null,
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
          carbonSaved: blankRecord.weight * 3.5, // Higher impact for finished items
          wasteReduced: blankRecord.weight
        }
      });
    }
    
  } catch (error) {
    console.error('Error tracking item:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}