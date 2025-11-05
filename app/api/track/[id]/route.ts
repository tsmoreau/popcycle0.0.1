import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDatabase } from '../../../../lib/mongodb';
import { Bin, Batch, Blank, Item } from '../../../../lib/schemas-v3';

// Function to determine collection type from QR code
function getCollectionType(qrCode: string): 'bin' | 'batch' | 'blank' | 'item' | null {
  if (qrCode.length < 1) return null;
  
  // Extract type from the first character (e.g., "B1234567" -> "B")
  const typeChar = qrCode.charAt(0);
  
  switch (typeChar) {
    case 'B': return 'bin';
    case 'T': return 'batch';
    case 'K': return 'blank';
    case 'I': return 'item';
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
    
    let record: Bin | Batch | Blank | Item | null = null;
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
      
      // Find event information if bin has an eventId (v3: query events collection)
      let eventInfo = null;
      if ((record as Bin).eventId) {
        const eventDoc = await db.collection('events').findOne({ eventId: (record as Bin).eventId } as any);
        if (eventDoc) {
          eventInfo = { 
            name: eventDoc.name,
            description: eventDoc.description,
            scheduledDate: eventDoc.scheduledDate
          };
        }
      }
      
      const binRecord = record as Bin;
      
      // Fetch batches produced from this bin
      const producedBatches = await db.collection('batches')
        .find({ binIds: binRecord._id })
        .limit(50)
        .toArray();
      
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
        eventDescription: eventInfo?.description || null,
        eventScheduledDate: eventInfo?.scheduledDate || null,
        organization: org ? {
          name: org.name,
          type: org.orgType,
          description: org.description,
          branding: org.branding
        } : null,
        binMessage: binRecord.message || null,
        orgMessage: org?.branding?.trackingPageMessage || null,
        message: binRecord.message || org?.branding?.trackingPageMessage || 'This bin is part of our circular economy program.',
        producedBatches: producedBatches.map((batch: any) => ({
          id: batch._id,
          weight: batch.weight,
          materialType: batch.materialType,
          status: batch.status,
          collectionDate: batch.collectionDate
        })),
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
      
      const batchRecord = record as Batch;
      
      // Fetch blanks produced from this batch
      const producedBlanks = await db.collection('blanks')
        .find({ batchIds: batchRecord._id })
        .limit(50)
        .toArray();
      
      // Fetch items produced directly from this batch
      const producedItems = await db.collection('items')
        .find({ batchIds: batchRecord._id })
        .limit(50)
        .toArray();
      
      // Fetch product details for blanks
      const blanksWithProducts = await Promise.all(
        producedBlanks.map(async (blank: any) => {
          let productInfo = null;
          if (blank.productId) {
            const product = await db.collection('products').findOne({ _id: new ObjectId(blank.productId) });
            if (product) {
              productInfo = {
                name: product.name,
                category: product.category
              };
            }
          }
          return {
            id: blank._id,
            status: blank.status,
            weight: blank.weight,
            productName: productInfo?.name || null,
            productCategory: productInfo?.category || null
          };
        })
      );
      
      // Fetch product details for items
      const itemsWithProducts = await Promise.all(
        producedItems.map(async (item: any) => {
          let productInfo = null;
          if (item.productId) {
            const product = await db.collection('products').findOne({ _id: new ObjectId(item.productId) });
            if (product) {
              productInfo = {
                name: product.name,
                category: product.category
              };
            }
          }
          return {
            id: item._id,
            status: item.status,
            serialNumber: item.serialNumber,
            productName: productInfo?.name || null,
            productCategory: productInfo?.category || null
          };
        })
      );
      
      return NextResponse.json({
        id: batchRecord._id,
        type: 'batch',
        binIds: batchRecord.binIds || [],
        collectionDate: batchRecord.collectionDate,
        weight: batchRecord.weight,
        materialType: batchRecord.materialType,
        collectedBy: batchRecord.collectedBy,
        status: batchRecord.status,
        notes: batchRecord.notes,
        organization: org ? {
          name: org.name,
          type: org.orgType,
          description: org.description,
          branding: org.branding
        } : null,
        message: org?.branding?.trackingPageMessage || 'This plastic has been collected and is being processed.',
        producedBlanks: blanksWithProducts,
        producedItems: itemsWithProducts,
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
        // batchIds is now an array, get the first batch for organization lookup
        batch = blankRecord.batchIds && blankRecord.batchIds.length > 0
          ? await db.collection('batches').findOne({ _id: blankRecord.batchIds[0] } as any) as Batch | null
          : null;
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
      
      // Fetch items produced from this blank
      const producedItems = await db.collection('items')
        .find({ blankIds: blankRecord._id })
        .limit(50)
        .toArray();
      
      // Fetch product details for items
      const itemsWithProducts = await Promise.all(
        producedItems.map(async (item: any) => {
          let productInfo = null;
          if (item.productId) {
            const product = await db.collection('products').findOne({ _id: new ObjectId(item.productId) });
            if (product) {
              productInfo = {
                name: product.name,
                category: product.category
              };
            }
          }
          return {
            id: item._id,
            status: item.status,
            serialNumber: item.serialNumber,
            productName: productInfo?.name || null,
            productCategory: productInfo?.category || null
          };
        })
      );
      
      return NextResponse.json({
        id: blankRecord._id,
        type: 'blank',
        batchIds: blankRecord.batchIds || [],
        userId: blankRecord.userId,
        materialType: batch?.materialType,
        createdAt: blankRecord.createdAt,
        itemType: blankRecord.status,
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
          type: org.orgType,
          description: org.description,
          branding: org.branding
        } : null,
        message: org?.branding?.trackingPageMessage || 'This item represents the transformation of waste into useful products.',
        producedItems: itemsWithProducts,
        impactMetrics: {
          carbonSaved: blankRecord.weight * 3.5, // Higher impact for finished items
          wasteReduced: blankRecord.weight
        }
      });
      
    } else if (collectionType === 'item') {
      // Look up item record using string ID (QR code)
      record = await db.collection('items').findOne({ _id: id } as any) as Item | null;
      
      if (!record) {
        return NextResponse.json({ error: 'Item not found' }, { status: 404 });
      }
      
      const itemRecord = record as Item;
      
      // Get product details
      let productDetails = null;
      if (itemRecord.productId) {
        productDetails = await db.collection('products').findOne({ _id: new ObjectId(itemRecord.productId) });
      }
      
      // Get user/maker details if assigned
      let userDetails = null;
      if (itemRecord.userId) {
        userDetails = await db.collection('users').findOne({ _id: new ObjectId(itemRecord.userId) });
      }
      
      // Trace back through all blanks and batches to collect ALL unique organizations
      const orgIds = new Set<string>();
      
      // Path 1: Item -> Blanks -> Batches -> Bins -> OrgIds
      if (itemRecord.blankIds && itemRecord.blankIds.length > 0) {
        const blanks = await db.collection('blanks')
          .find({ _id: { $in: itemRecord.blankIds } } as any)
          .toArray() as Blank[];
        
        for (const blank of blanks) {
          if (blank.batchIds && blank.batchIds.length > 0) {
            const batches = await db.collection('batches')
              .find({ _id: { $in: blank.batchIds } } as any)
              .toArray() as Batch[];
            
            for (const batch of batches) {
              if (batch.binIds && batch.binIds.length > 0) {
                const bins = await db.collection('bins')
                  .find({ _id: { $in: batch.binIds } } as any)
                  .toArray() as Bin[];
                
                bins.forEach(bin => {
                  if (bin.orgId) orgIds.add(bin.orgId.toString());
                });
              }
            }
          }
        }
      }
      
      // Path 2: Item -> Batches -> Bins -> OrgIds
      if (itemRecord.batchIds && itemRecord.batchIds.length > 0) {
        const batches = await db.collection('batches')
          .find({ _id: { $in: itemRecord.batchIds } } as any)
          .toArray() as Batch[];
        
        for (const batch of batches) {
          if (batch.binIds && batch.binIds.length > 0) {
            const bins = await db.collection('bins')
              .find({ _id: { $in: batch.binIds } } as any)
              .toArray() as Bin[];
            
            bins.forEach(bin => {
              if (bin.orgId) orgIds.add(bin.orgId.toString());
            });
          }
        }
      }
      
      // Fetch all unique organizations
      const origins = [];
      if (orgIds.size > 0) {
        const orgObjectIds = Array.from(orgIds).map(id => {
          try {
            return new ObjectId(id);
          } catch {
            return id;
          }
        });
        
        const orgs = await db.collection('orgs')
          .find({ _id: { $in: orgObjectIds } } as any)
          .toArray();
        
        origins.push(...orgs.map(o => ({
          id: o._id.toString(),
          name: o.name,
          type: o.orgType,
          description: o.description,
          branding: o.branding
        })));
      }
      
      // Keep 'organization' for backward compatibility (first org or product org)
      if (productDetails?.org) {
        try {
          org = await db.collection('orgs').findOne({ _id: new ObjectId(productDetails.org) });
        } catch (error) {
          org = await db.collection('orgs').findOne({ _id: productDetails.org });
        }
      } else if (origins.length > 0) {
        // Use first origin as the main org for backward compatibility
        const firstOrgId = Array.from(orgIds)[0];
        try {
          org = await db.collection('orgs').findOne({ _id: new ObjectId(firstOrgId) });
        } catch {
          org = await db.collection('orgs').findOne({ _id: firstOrgId } as any);
        }
      }
      
      return NextResponse.json({
        id: itemRecord._id,
        type: 'item',
        blankIds: itemRecord.blankIds || [],
        batchIds: itemRecord.batchIds || [],
        productId: itemRecord.productId,
        userId: itemRecord.userId,
        orderId: itemRecord.orderId,
        editionNumber: itemRecord.editionNumber,
        status: itemRecord.status,
        weight: itemRecord.weight,
        photoUrl: itemRecord.photoUrl,
        thumbnailUrl: itemRecord.thumbnailUrl,
        serialNumber: itemRecord.serialNumber,
        assemblyDate: itemRecord.assemblyDate,
        qualityCheckDate: itemRecord.qualityCheckDate,
        shipDate: itemRecord.shipDate,
        deliveryDate: itemRecord.deliveryDate,
        recipientName: itemRecord.recipientName,
        recipientEmail: itemRecord.recipientEmail,
        shippingAddress: itemRecord.shippingAddress,
        trackingNumber: itemRecord.trackingNumber,
        productDetails: productDetails ? {
          name: productDetails.name,
          description: productDetails.description,
          productType: productDetails.productType,
          category: productDetails.category,
          price: productDetails.price,
          assets: productDetails.assets,
          specs: productDetails.specs
        } : null,
        makerDetails: userDetails ? {
          name: userDetails.name,
          location: userDetails.location || 'Unknown',
          assemblyDate: itemRecord.assemblyDate?.toISOString() || null,
          story: `Assembled by ${userDetails.name}`,
          verifiedEmail: userDetails.email
        } : null,
        organization: org ? {
          name: org.name,
          type: org.orgType,
          description: org.description,
          branding: org.branding
        } : null,
        origins: origins.length > 0 ? origins : null,
        message: org?.branding?.trackingPageMessage || 'This finished product represents the complete transformation of waste into a useful item.',
        impactMetrics: {
          carbonSaved: itemRecord.weight * 4.0, // Highest impact for completed items
          wasteReduced: itemRecord.weight
        }
      });
    }
    
  } catch (error) {
    console.error('Error tracking item:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}