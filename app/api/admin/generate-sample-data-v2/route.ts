import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// Generate QR code IDs with embedded type information
function generateQRCode(type: 'bin' | 'batch' | 'blank' | 'item'): string {
  const typeChar = {
    bin: 'B',
    batch: 'T',
    blank: 'K',
    item: 'I'
  }[type];
  
  const randomNum = Math.floor(Math.random() * Math.pow(36, 7));
  const seqStr = randomNum.toString(36).toUpperCase().padStart(7, '0');
  
  return `${typeChar}${seqStr}`;
}

export async function POST() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      return NextResponse.json({ error: 'MONGODB_URI not configured' }, { status: 500 });
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('PopCycle');
    
    // Get existing orgs and products - DO NOT clear them
    const existingOrgs = await db.collection('orgs').find({}).toArray();
    const existingProducts = await db.collection('products').find({}).toArray();
    const existingUsers = await db.collection('users').find({}).toArray();
    
    if (existingOrgs.length === 0) {
      await client.close();
      return NextResponse.json({ error: 'No organizations found. Run main sample data first.' }, { status: 400 });
    }
    
    if (existingProducts.length === 0) {
      await client.close();
      return NextResponse.json({ error: 'No products found. Run main sample data first.' }, { status: 400 });
    }
    
    // Clear only the tracking collections
    const trackingCollections = ['bins', 'batches', 'blanks', 'items', 'orders', 'events'];
    for (const collName of trackingCollections) {
      await db.collection(collName).deleteMany({});
    }
    
    // Get org IDs for sample data
    const popcycleOrg = existingOrgs.find(o => o.slug === 'popcycle');
    const discoveryCubeOrg = existingOrgs.find(o => o.slug === 'discoverycube');
    const laPlazaOrg = existingOrgs.find(o => o.slug === 'laplaza');
    const aceHotelOrg = existingOrgs.find(o => o.slug === 'acehotel');
    
    if (!popcycleOrg || !discoveryCubeOrg || !laPlazaOrg || !aceHotelOrg) {
      await client.close();
      return NextResponse.json({ error: 'Required orgs not found' }, { status: 400 });
    }
    
    // Get a user for maker assignments
    const makerUser = existingUsers[0];
    
    // Create events for comprehensive testing
    const events = [
      {
        _id: new ObjectId(),
        orgId: discoveryCubeOrg._id,
        eventId: 'summer-camp-2025',
        name: 'Summer Science Camp 2025',
        type: 'recurring' as const,
        description: 'Weekly summer camps with plastic collection activities',
        scheduledDate: new Date('2025-06-15'),
        location: 'Main Exhibition Hall',
        binIds: [],
        status: 'planned' as const,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        orgId: laPlazaOrg._id,
        eventId: 'cultural-workshop-2025',
        name: 'Cultural Workshop Series 2025',
        type: 'recurring' as const,
        description: 'Monthly workshops highlighting sustainability in Mexican culture',
        scheduledDate: new Date('2025-03-15'),
        location: 'Main Gallery',
        binIds: [],
        status: 'planned' as const,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    await db.collection('events').insertMany(events);
    
    // ========== COMPREHENSIVE BIN SCENARIOS ==========
    const bins: any[] = [];
    const binScenarios = [
      // Discovery Cube bins
      { orgId: discoveryCubeOrg._id, eventId: 'summer-camp-2025', canBeAdopted: true, adoptedBy: 'Education Team', message: 'This bin is proudly maintained by our Education Team!', status: 'bin_on_site' as const },
      { orgId: discoveryCubeOrg._id, eventId: 'summer-camp-2025', canBeAdopted: true, adoptedBy: undefined, message: 'Thank you for participating in our summer camp event!', status: 'ready_for_processing' as const },
      { orgId: discoveryCubeOrg._id, eventId: undefined, canBeAdopted: true, adoptedBy: undefined, message: undefined, status: 'bin_on_site' as const },
      { orgId: discoveryCubeOrg._id, eventId: undefined, canBeAdopted: false, adoptedBy: undefined, message: 'Special collection bin for staff use only.', status: 'bin_on_vehicle' as const },
      
      // LA Plaza bins
      { orgId: laPlazaOrg._id, eventId: 'cultural-workshop-2025', canBeAdopted: true, adoptedBy: 'Cultural Team', message: 'Maintained by our Cultural Team - celebrating sustainability!', status: 'ready_for_processing' as const },
      { orgId: laPlazaOrg._id, eventId: 'cultural-workshop-2025', canBeAdopted: true, adoptedBy: undefined, message: undefined, status: 'bin_on_site' as const },
      { orgId: laPlazaOrg._id, eventId: undefined, canBeAdopted: true, adoptedBy: undefined, message: undefined, status: 'bin_on_site' as const },
      { orgId: laPlazaOrg._id, eventId: undefined, canBeAdopted: true, adoptedBy: 'Gallery Staff', message: undefined, status: 'ready_for_processing' as const },
      
      // Ace Hotel bins
      { orgId: aceHotelOrg._id, eventId: undefined, canBeAdopted: false, adoptedBy: undefined, message: 'Thank you for supporting our zero-waste initiative!', status: 'bin_on_site' as const },
      { orgId: aceHotelOrg._id, eventId: undefined, canBeAdopted: false, adoptedBy: undefined, message: undefined, status: 'ready_for_processing' as const },
      { orgId: aceHotelOrg._id, eventId: undefined, canBeAdopted: true, adoptedBy: 'Housekeeping Team', message: undefined, status: 'bin_on_vehicle' as const },
      
      // PopCycle bins
      { orgId: popcycleOrg._id, eventId: undefined, canBeAdopted: true, adoptedBy: undefined, message: undefined, status: 'bin_on_site' as const },
      { orgId: popcycleOrg._id, eventId: undefined, canBeAdopted: true, adoptedBy: 'Studio Team', message: 'Studio production collection bin', status: 'ready_for_processing' as const },
      { orgId: popcycleOrg._id, eventId: undefined, canBeAdopted: false, adoptedBy: undefined, message: undefined, status: 'bin_on_site' as const }
    ];
    
    binScenarios.forEach((scenario, i) => {
      const qrCode = generateQRCode('bin');
      const orgName = existingOrgs.find(o => o._id.equals(scenario.orgId))?.name || 'Unknown';
      
      bins.push({
        _id: qrCode,
        orgId: scenario.orgId,
        eventId: scenario.eventId,
        name: `${orgName} Bin ${i + 1}`,
        type: 'permanent' as const,
        location: `Location ${String.fromCharCode(65 + (i % 5))}`,
        capacity: 50,
        isActive: true,
        status: scenario.status,
        canBeAdopted: scenario.canBeAdopted,
        adoptedBy: scenario.adoptedBy,
        message: scenario.message,
        lastCollectionDate: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000),
        nextCollectionDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
    
    await db.collection('bins').insertMany(bins);
    
    // ========== COMPREHENSIVE BATCH SCENARIOS (HDPE ONLY) ==========
    const batches: any[] = [];
    const batchStatuses = ['collected', 'rough_wash', 'sort', 'first_dry', 'shred', 'fine_wash', 'second_dry', 'press', 'weigh_photo', 'laser_marking', 'inventory_creation'] as const;
    const collectors = ['John Smith', 'Maria Garcia', 'David Chen'];
    
    // Single bin batches (6 batches)
    for (let i = 0; i < 6; i++) {
      const qrCode = generateQRCode('batch');
      const status = i < 4 ? 'inventory_creation' : batchStatuses[i];
      
      batches.push({
        _id: qrCode,
        binIds: [bins[i]._id],
        collectionDate: new Date(Date.now() - (30 - i * 2) * 24 * 60 * 60 * 1000),
        weight: Math.round((Math.random() * 8 + 5) * 10) / 10,
        materialType: 'HDPE',
        collectedBy: collectors[i % collectors.length],
        status: status,
        notes: i === 0 ? 'High quality HDPE from single source' : undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    // Multi-bin batches (4 batches)
    for (let i = 0; i < 4; i++) {
      const qrCode = generateQRCode('batch');
      const binCount = i % 2 === 0 ? 2 : 3;
      const selectedBins = bins.slice(6 + (i * 2), 6 + (i * 2) + binCount);
      const status = i < 2 ? 'inventory_creation' : batchStatuses[6 + i];
      
      batches.push({
        _id: qrCode,
        binIds: selectedBins.map(b => b._id),
        collectionDate: new Date(Date.now() - (20 - i * 3) * 24 * 60 * 60 * 1000),
        weight: Math.round((Math.random() * 15 + 10) * 10) / 10,
        materialType: 'HDPE',
        collectedBy: collectors[i % collectors.length],
        status: status,
        notes: i === 0 ? 'Mixed collection from multiple partner locations' : undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    // In-progress batches (4 batches)
    for (let i = 0; i < 4; i++) {
      const qrCode = generateQRCode('batch');
      const status = batchStatuses[2 + i * 2]; // Various in-progress statuses
      
      batches.push({
        _id: qrCode,
        binIds: bins.slice(i, i + 1).map(b => b._id),
        collectionDate: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
        weight: Math.round((Math.random() * 10 + 3) * 10) / 10,
        materialType: 'HDPE',
        collectedBy: collectors[i % collectors.length],
        status: status,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    await db.collection('batches').insertMany(batches);
    
    // ========== COMPREHENSIVE BLANK SCENARIOS ==========
    const blanks: any[] = [];
    const completedBatches = batches.filter(b => b.status === 'inventory_creation');
    
    // Single batch blanks with various statuses (8 blanks)
    const blankStatuses = ['blank', 'reserved', 'in_assembly', 'assembled'] as const;
    for (let i = 0; i < 8; i++) {
      const qrCode = generateQRCode('blank');
      const batch = completedBatches[i % completedBatches.length];
      
      blanks.push({
        _id: qrCode,
        batchIds: [batch._id],
        weight: Math.round((Math.random() * 0.5 + 0.2) * 100) / 100,
        dimensions: { length: 100, width: 100, thickness: 3 },
        status: blankStatuses[i % blankStatuses.length],
        orderId: i % 3 === 0 ? new ObjectId() : undefined,
        editionNumber: i % 2 === 0 ? (i % 4) + 1 : undefined,
        photoUrl: i === 0 ? '/images/blanks/sample.jpg' : undefined,
        thumbnailUrl: i === 0 ? '/images/blanks/thumbs/sample.jpg' : undefined,
        createdAt: new Date(Date.now() - (15 - i) * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      });
    }
    
    // Multi-batch blanks (4 blanks)
    for (let i = 0; i < 4; i++) {
      const qrCode = generateQRCode('blank');
      const batchCount = i % 2 === 0 ? 2 : 3;
      const selectedBatches = completedBatches.slice(i, i + batchCount);
      
      blanks.push({
        _id: qrCode,
        batchIds: selectedBatches.map(b => b._id),
        weight: Math.round((Math.random() * 0.8 + 0.3) * 100) / 100,
        dimensions: { length: 150, width: 150, thickness: 4 },
        status: blankStatuses[i % blankStatuses.length],
        orderId: i === 0 ? new ObjectId() : undefined,
        editionNumber: i + 1,
        createdAt: new Date(Date.now() - (10 - i) * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      });
    }
    
    // Different edition blanks for same product (6 blanks across editions 1-3)
    for (let edition = 1; edition <= 3; edition++) {
      for (let copy = 1; copy <= 2; copy++) {
        const qrCode = generateQRCode('blank');
        const batch = completedBatches[edition % completedBatches.length];
        
        blanks.push({
          _id: qrCode,
          batchIds: [batch._id],
          weight: Math.round((Math.random() * 0.4 + 0.3) * 100) / 100,
          dimensions: { length: 120, width: 120, thickness: 3 },
          status: 'blank' as const,
          editionNumber: edition,
          createdAt: new Date(Date.now() - (20 - edition * 2 - copy) * 24 * 60 * 60 * 1000),
          updatedAt: new Date()
        });
      }
    }
    
    await db.collection('blanks').insertMany(blanks);
    
    // ========== COMPREHENSIVE ITEM SCENARIOS ==========
    const items: any[] = [];
    const itemStatuses = ['assembled', 'quality_checked', 'packaged', 'shipped', 'delivered'] as const;
    const assembledBlanks = blanks.filter(b => b.status === 'assembled' || b.status === 'blank').slice(0, 10);
    
    // Get workshop products only for items
    const workshopProducts = existingProducts.filter((p: any) => p.category === 'workshop');
    
    if (workshopProducts.length === 0) {
      await client.close();
      return NextResponse.json({ error: 'No workshop products found' }, { status: 400 });
    }
    
    // Items from blanks (various products and statuses) - 10 items
    for (let i = 0; i < 10; i++) {
      const qrCode = generateQRCode('item');
      const blank = assembledBlanks[i % assembledBlanks.length];
      const product = workshopProducts[i % workshopProducts.length];
      
      items.push({
        _id: qrCode,
        blankIds: [blank._id],
        batchIds: undefined,
        productId: product._id,
        userId: makerUser ? makerUser._id : undefined,
        orderId: i % 4 === 0 ? new ObjectId() : undefined,
        editionNumber: blank.editionNumber || ((i % 3) + 1),
        status: itemStatuses[i % itemStatuses.length],
        weight: blank.weight,
        serialNumber: `${product.productType.substring(0, 2).toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
        photoUrl: i % 2 === 0 ? '/images/items/sample.jpg' : undefined,
        thumbnailUrl: i % 2 === 0 ? '/images/items/thumbs/sample.jpg' : undefined,
        assemblyDate: new Date(Date.now() - (10 - i) * 24 * 60 * 60 * 1000),
        qualityCheckDate: i < 8 ? new Date(Date.now() - (9 - i) * 24 * 60 * 60 * 1000) : undefined,
        shipDate: i < 4 ? new Date(Date.now() - (5 - i) * 24 * 60 * 60 * 1000) : undefined,
        deliveryDate: i < 2 ? new Date(Date.now() - (2 - i) * 24 * 60 * 60 * 1000) : undefined,
        recipientName: i < 4 ? `Customer ${i + 1}` : undefined,
        recipientEmail: i < 4 ? `customer${i + 1}@example.com` : undefined,
        createdAt: new Date(Date.now() - (10 - i) * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      });
    }
    
    // Items from multi-blanks (2 items)
    for (let i = 0; i < 2; i++) {
      const qrCode = generateQRCode('item');
      const selectedBlanks = assembledBlanks.slice(i * 2, (i * 2) + 2);
      const product = workshopProducts[i % workshopProducts.length];
      
      items.push({
        _id: qrCode,
        blankIds: selectedBlanks.map(b => b._id),
        batchIds: undefined,
        productId: product._id,
        userId: makerUser ? makerUser._id : undefined,
        editionNumber: (i + 1),
        status: 'quality_checked' as const,
        weight: selectedBlanks.reduce((sum, b) => sum + b.weight, 0),
        serialNumber: `${product.productType.substring(0, 2).toUpperCase()}-M${String(i + 1).padStart(2, '0')}`,
        assemblyDate: new Date(Date.now() - (8 - i) * 24 * 60 * 60 * 1000),
        qualityCheckDate: new Date(Date.now() - (7 - i) * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - (8 - i) * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      });
    }
    
    // Items from batches directly (alternative flow) - 3 items
    for (let i = 0; i < 3; i++) {
      const qrCode = generateQRCode('item');
      const batch = completedBatches[i % completedBatches.length];
      const product = workshopProducts[(i + 5) % workshopProducts.length];
      
      items.push({
        _id: qrCode,
        blankIds: undefined,
        batchIds: [batch._id],
        productId: product._id,
        userId: makerUser ? makerUser._id : undefined,
        editionNumber: 1,
        status: 'assembled' as const,
        weight: Math.round((Math.random() * 0.3 + 0.2) * 100) / 100,
        serialNumber: `${product.productType.substring(0, 2).toUpperCase()}-B${String(i + 1).padStart(2, '0')}`,
        assemblyDate: new Date(Date.now() - (5 - i) * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - (5 - i) * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      });
    }
    
    // Items with various serial number patterns - 5 items
    const serialPatterns = [
      { prefix: 'CO', number: 101 },
      { prefix: 'KY', number: 42 },
      { prefix: 'BK', number: 7 },
      { prefix: 'MG', number: 88 },
      { prefix: 'EA', number: 15 }
    ];
    
    for (let i = 0; i < 5; i++) {
      const qrCode = generateQRCode('item');
      const blank = assembledBlanks[(i + 5) % assembledBlanks.length];
      const product = workshopProducts[i % workshopProducts.length];
      const pattern = serialPatterns[i];
      
      items.push({
        _id: qrCode,
        blankIds: [blank._id],
        batchIds: undefined,
        productId: product._id,
        userId: makerUser ? makerUser._id : undefined,
        editionNumber: (i % 2) + 1,
        status: itemStatuses[(i + 2) % itemStatuses.length],
        weight: blank.weight,
        serialNumber: `${pattern.prefix}-${String(pattern.number).padStart(3, '0')}`,
        photoUrl: '/images/items/sample.jpg',
        thumbnailUrl: '/images/items/thumbs/sample.jpg',
        assemblyDate: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      });
    }
    
    await db.collection('items').insertMany(items);
    
    await client.close();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Sample data V2 generated successfully',
      stats: {
        bins: bins.length,
        batches: batches.length,
        blanks: blanks.length,
        items: items.length,
        events: events.length
      }
    });
  } catch (error: any) {
    console.error('Error generating sample data V2:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
