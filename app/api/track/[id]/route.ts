import { NextRequest, NextResponse } from 'next/server';
import { ObjectId, Db } from 'mongodb';
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

// Supply chain traversal result
interface SupplyChainData {
  binMap: Map<string, Bin>;
  batchMap: Map<string, Batch>;
  blankMap: Map<string, Blank>;
  orgIds: Set<string>;
  eventIds: Set<string>;
}

// Traverse supply chain upward from batch/blank/item to collect all related records
async function traceSupplyChain(
  db: Db,
  options: {
    batchIds?: string[];
    blankIds?: string[];
    itemRecord?: Item;
  }
): Promise<SupplyChainData> {
  const binMap = new Map<string, Bin>();
  const batchMap = new Map<string, Batch>();
  const blankMap = new Map<string, Blank>();
  const orgIds = new Set<string>();
  const eventIds = new Set<string>();

  // Helper to collect bins and extract orgIds/eventIds
  async function collectBinsFromBatchIds(batchIdsToProcess: string[]) {
    if (!batchIdsToProcess || batchIdsToProcess.length === 0) return;
    
    const batches = await db.collection<Batch>('batches')
      .find({ _id: { $in: batchIdsToProcess } })
      .toArray();
    
    for (const batch of batches) {
      batchMap.set(batch._id, batch);
      
      if (batch.binIds && batch.binIds.length > 0) {
        const bins = await db.collection<Bin>('bins')
          .find({ _id: { $in: batch.binIds } })
          .toArray();
        
        for (const bin of bins) {
          binMap.set(bin._id, bin);
          if (bin.orgId) orgIds.add(bin.orgId.toString());
          if (bin.eventId) eventIds.add(bin.eventId);
        }
      }
    }
  }

  // Process from item (three paths: via blanks, direct batches, or direct bins)
  if (options.itemRecord) {
    // Path 1: Item -> Blanks -> Batches -> Bins
    if (options.itemRecord.blankIds && options.itemRecord.blankIds.length > 0) {
      const blanks = await db.collection<Blank>('blanks')
        .find({ _id: { $in: options.itemRecord.blankIds } })
        .toArray();
      
      const batchIdsFromBlanks: string[] = [];
      for (const blank of blanks) {
        blankMap.set(blank._id, blank);
        if (blank.batchIds) {
          batchIdsFromBlanks.push(...blank.batchIds);
        }
      }
      
      await collectBinsFromBatchIds(batchIdsFromBlanks);
    }
    
    // Path 2: Item -> Batches -> Bins
    if (options.itemRecord.batchIds && options.itemRecord.batchIds.length > 0) {
      await collectBinsFromBatchIds(options.itemRecord.batchIds);
    }
    
    // Path 3: Item -> Bins (direct bin references)
    if (options.itemRecord.binIds && options.itemRecord.binIds.length > 0) {
      const bins = await db.collection<Bin>('bins')
        .find({ _id: { $in: options.itemRecord.binIds } })
        .toArray();
      
      for (const bin of bins) {
        binMap.set(bin._id, bin);
        if (bin.orgId) orgIds.add(bin.orgId.toString());
        if (bin.eventId) eventIds.add(bin.eventId);
      }
    }
  }
  
  // Process from blank
  if (options.blankIds && options.blankIds.length > 0) {
    const blanks = await db.collection<Blank>('blanks')
      .find({ _id: { $in: options.blankIds } })
      .toArray();
    
    const batchIdsFromBlanks: string[] = [];
    for (const blank of blanks) {
      blankMap.set(blank._id, blank);
      if (blank.batchIds) {
        batchIdsFromBlanks.push(...blank.batchIds);
      }
    }
    
    await collectBinsFromBatchIds(batchIdsFromBlanks);
  }
  
  // Process from batch
  if (options.batchIds && options.batchIds.length > 0) {
    await collectBinsFromBatchIds(options.batchIds);
  }

  return { binMap, batchMap, blankMap, orgIds, eventIds };
}

// Fetch and format organizations from collected orgIds
async function fetchOrigins(db: any, orgIds: Set<string>) {
  if (orgIds.size === 0) return [];
  
  const orgObjectIds: ObjectId[] = Array.from(orgIds)
    .map(id => {
      try {
        return new ObjectId(id);
      } catch {
        return null;
      }
    })
    .filter((id): id is ObjectId => id !== null);
  
  const orgs = await db.collection('orgs')
    .find({ _id: { $in: orgObjectIds } })
    .toArray();
  
  return orgs.map(o => ({
    id: o._id.toString(),
    name: o.name,
    type: o.orgType,
    description: o.description,
    branding: o.branding
  }));
}

// Fetch and format events from collected eventIds
async function fetchEvents(db: any, eventIds: Set<string>) {
  if (eventIds.size === 0) return [];
  
  const events = await db.collection('events')
    .find({ eventId: { $in: Array.from(eventIds) } })
    .toArray();
  
  return events.map(e => ({
    eventId: e.eventId,
    name: e.name,
    description: e.description,
    scheduledDate: e.scheduledDate,
    type: e.type
  }));
}

// Enrich items/blanks with product details
async function enrichWithProducts<T extends { productId?: any }>(
  db: any,
  items: T[]
): Promise<Array<T & { productName?: string; productType?: string }>> {
  return Promise.all(
    items.map(async (item) => {
      let productInfo = null;
      if (item.productId) {
        try {
          const product = await db.collection('products').findOne({ 
            _id: new ObjectId(item.productId) 
          });
          if (product) {
            productInfo = {
              name: product.name,
              productType: product.productType
            };
          }
        } catch {
          // Invalid ObjectId, skip product lookup
        }
      }
      return {
        ...item,
        productName: productInfo?.name || undefined,
        productType: productInfo?.productType || undefined
      };
    })
  );
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
      record = await db.collection<Bin>('bins').findOne({ _id: id });
      if (record) {
        try {
          org = await db.collection('orgs').findOne({ _id: new ObjectId((record as Bin).orgId) });
        } catch (error) {
          org = null;
        }
      }
      
      if (!record) {
        return NextResponse.json({ error: 'Bin not found' }, { status: 404 });
      }
      
      // Find event information if bin has an eventId (v3: query events collection)
      let eventInfo = null;
      if ((record as Bin).eventId) {
        const eventDoc = await db.collection('events').findOne({ eventId: (record as Bin).eventId });
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
      const producedBatches = await db.collection<Batch>('batches')
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
      record = await db.collection<Batch>('batches').findOne({ _id: id });
      
      if (!record) {
        return NextResponse.json({ error: 'Batch not found' }, { status: 404 });
      }
      
      const batchRecord = record as Batch;
      
      // Trace supply chain and collect related data
      const { binMap, orgIds, eventIds } = await traceSupplyChain(db, { 
        batchIds: [batchRecord._id] 
      });
      
      // Fetch origins and events
      const origins = await fetchOrigins(db, orgIds);
      const events = await fetchEvents(db, eventIds);
      
      // Get first org for backward compatibility
      let org = null;
      if (origins.length > 0) {
        try {
          org = await db.collection('orgs').findOne({ _id: new ObjectId(origins[0].id) });
        } catch {
          org = null;
        }
      }
      
      // Fetch blanks produced from this batch
      const producedBlanks = await db.collection<Blank>('blanks')
        .find({ batchIds: batchRecord._id })
        .limit(50)
        .toArray();
      
      // Fetch items produced directly from this batch
      const producedItems = await db.collection<Item>('items')
        .find({ batchIds: batchRecord._id })
        .limit(50)
        .toArray();
      
      // Enrich with product details
      const blanksWithProducts = await enrichWithProducts(db, producedBlanks.map(b => ({
        id: b._id,
        status: b.status,
        weight: b.weight,
        productId: b.productId
      })));
      
      const itemsWithProducts = await enrichWithProducts(db, producedItems.map(i => ({
        id: i._id,
        status: i.status,
        serialNumber: i.serialNumber,
        productId: i.productId
      })));
      
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
        origins: origins.length > 0 ? origins : null,
        events: events.length > 0 ? events : null,
        message: org?.branding?.trackingPageMessage || 'This plastic has been collected and is being processed.',
        producedBlanks: blanksWithProducts,
        producedItems: itemsWithProducts,
        bins: Array.from(binMap.values()).map((bin: any) => ({
          id: bin._id,
          name: bin.name,
          location: bin.location
        })),
        impactMetrics: {
          carbonSaved: batchRecord.weight * 2.3, // Rough calculation
          wasteReduced: batchRecord.weight
        }
      });
      
    } else if (collectionType === 'blank') {
      // Look up blank record using string ID (QR code)
      record = await db.collection<Blank>('blanks').findOne({ _id: id });
      
      if (!record) {
        return NextResponse.json({ error: 'Blank not found' }, { status: 404 });
      }
      
      const blankRecord = record as Blank;
      
      // Trace supply chain and collect related data
      const { binMap, batchMap, orgIds, eventIds } = await traceSupplyChain(db, {
        blankIds: [blankRecord._id]
      });
      
      // Fetch origins and events
      const origins = await fetchOrigins(db, orgIds);
      const events = await fetchEvents(db, eventIds);
      
      // Get first org for backward compatibility
      let org = null;
      if (origins.length > 0) {
        try {
          org = await db.collection('orgs').findOne({ _id: new ObjectId(origins[0].id) });
        } catch {
          org = null;
        }
      }
      
      // Get user details if assigned
      let userDetails = null;
      if (blankRecord.userId) {
        userDetails = await db.collection('users').findOne({ _id: new ObjectId(blankRecord.userId) });
      }
      
      // Fetch items produced from this blank
      const producedItems = await db.collection<Item>('items')
        .find({ blankIds: blankRecord._id })
        .limit(50)
        .toArray();
      
      // Enrich with product details
      const itemsWithProducts = await enrichWithProducts(db, producedItems.map(i => ({
        id: i._id,
        status: i.status,
        serialNumber: i.serialNumber,
        productId: i.productId
      })));
      
      // Get material type from first batch
      const firstBatch = Array.from(batchMap.values())[0];
      
      return NextResponse.json({
        id: blankRecord._id,
        type: 'blank',
        batchIds: blankRecord.batchIds || [],
        userId: blankRecord.userId,
        materialType: firstBatch?.materialType,
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
        origins: origins.length > 0 ? origins : null,
        events: events.length > 0 ? events : null,
        message: org?.branding?.trackingPageMessage || 'This item represents the transformation of waste into useful products.',
        producedItems: itemsWithProducts,
        batches: Array.from(batchMap.values()).map((batch: any) => ({
          id: batch._id,
          weight: batch.weight,
          materialType: batch.materialType,
          status: batch.status
        })),
        bins: Array.from(binMap.values()).map((bin: any) => ({
          id: bin._id,
          name: bin.name,
          location: bin.location
        })),
        impactMetrics: {
          carbonSaved: blankRecord.weight * 3.5, // Higher impact for finished items
          wasteReduced: blankRecord.weight
        }
      });
      
    } else if (collectionType === 'item') {
      // Look up item record using string ID (QR code)
      record = await db.collection<Item>('items').findOne({ _id: id });
      
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
      
      // Trace supply chain and collect related data
      const { binMap, batchMap, blankMap, orgIds, eventIds } = await traceSupplyChain(db, {
        itemRecord
      });
      
      // Fetch origins and events
      const origins = await fetchOrigins(db, orgIds);
      const events = await fetchEvents(db, eventIds);
      
      // Keep 'organization' for backward compatibility (first org or product org)
      if (productDetails?.org) {
        try {
          org = await db.collection('orgs').findOne({ _id: new ObjectId(productDetails.org) });
        } catch (error) {
          org = null;
        }
      } else if (origins.length > 0) {
        try {
          org = await db.collection('orgs').findOne({ _id: new ObjectId(origins[0].id) });
        } catch {
          org = null;
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
        events: events.length > 0 ? events : null,
        blanks: Array.from(blankMap.values()).map((blank: any) => ({
          id: blank._id,
          weight: blank.weight,
          status: blank.status,
          materialType: blank.materialType,
          createdAt: blank.createdAt
        })),
        batches: Array.from(batchMap.values()).map((batch: any) => ({
          id: batch._id,
          weight: batch.weight,
          materialType: batch.materialType,
          collectionDate: batch.collectionDate,
          status: batch.status
        })),
        bins: Array.from(binMap.values()).map((bin: any) => ({
          id: bin._id,
          name: bin.name,
          location: bin.location,
          lastCollectionDate: bin.lastCollectionDate
        })),
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