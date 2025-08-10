import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// Generate QR code IDs with embedded type information (no org prefix)
function generateQRCode(partnerIndex: number, type: 'bin' | 'batch' | 'item'): string {
  // Embed type in the first character of the sequence
  const typeChar = {
    bin: 'B',     // Bins start with B
    batch: 'T',   // Batches start with T  
    item: 'K'     // Blanks start with K
  }[type];
  
  // Generate random 7-character Base36 sequence for the rest
  const randomNum = Math.floor(Math.random() * Math.pow(36, 7)); // 0 to 36^7-1
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
    
    // Clear existing data
    const collections = ['orgs', 'bins', 'batches', 'blanks', 'users', 'products', 'orders'];
    for (const collName of collections) {
      await db.collection(collName).deleteMany({});
    }
    
    // Generate Organizations (Partners)
    const orgs = [
      {
        _id: new ObjectId(),
        name: 'PopCycle',
        slug: 'popcycle',
        type: 'corporate' as const,
        description: 'Circular plastic waste tracking and recycling management system',
        contactInfo: {
          email: 'hello@popcycle.org',
          phone: '(555) 000-0000',
          address: 'Los Angeles, CA',
          website: 'https://www.popcycle.org'
        },
        branding: {
          primaryColor: '#00C851',
          secondaryColor: '#0074D9',
          trackingPageMessage: 'Welcome to PopCycle! Track your plastic items through their circular journey from waste to product.'
        },
        events: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Discovery Cube',
        slug: 'discoverycube',
        type: 'educational' as const,
        description: 'Interactive science museum in Santa Ana',
        contactInfo: {
          email: 'partnerships@discoverycube.org',
          phone: '(714) 542-2823',
          address: '2500 N Main St, Santa Ana, CA 92705',
          website: 'https://www.discoverycube.org'
        },
        branding: {
          primaryColor: '#FF6B35',
          secondaryColor: '#004B87',
          trackingPageMessage: 'See how your Discovery Cube visit contributed to our circular plastic program!'
        },
        events: [
          {
            eventId: 'summer-camp-2025',
            name: 'Summer Science Camp 2025',
            type: 'recurring' as const,
            description: 'Weekly summer camps with plastic collection activities',
            scheduledDate: new Date('2025-06-15'),
            location: 'Main Exhibition Hall',
            binIds: [],
            status: 'planned' as const
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'LA Plaza de Cultura y Artes',
        slug: 'laplaza',
        type: 'educational' as const,
        description: 'Cultural center dedicated to Mexican and Mexican American culture',
        contactInfo: {
          email: 'sustainability@lapca.org',
          phone: '(213) 542-6200',
          address: '501 N Main St, Los Angeles, CA 90012',
          website: 'https://www.lapca.org'
        },
        branding: {
          primaryColor: '#D2691E',
          secondaryColor: '#8B4513',
          trackingPageMessage: 'Your La Plaza visit helped transform plastic waste into educational resources celebrating our culture!'
        },
        events: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Ace Hotel Downtown LA',
        slug: 'acehotel',
        type: 'corporate' as const,
        description: 'Boutique hotel with sustainability focus',
        contactInfo: {
          email: 'sustainability@acehotel.com',
          phone: '(213) 623-3233',
          address: '929 S Broadway, Los Angeles, CA 90015',
          website: 'https://www.acehotel.com/losangeles'
        },
        branding: {
          primaryColor: '#2D2D2D',
          secondaryColor: '#F5F5F5',
          trackingPageMessage: 'Your stay at Ace Hotel contributed to our zero-waste initiative!'
        },
        events: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    await db.collection('orgs').insertMany(orgs);
    
    // Generate Bins with QR codes
    const bins: any[] = [];
    const eventNames = [
      'Summer Music Festival 2025',
      'Comic-Con International',
      'Corporate Holiday Party',
      'Art Walk Downtown',
      'Food & Wine Festival',
      'Tech Conference 2025',
      'Community Earth Day',
      'Museum Gala Night',
      null, // Some bins have no special event
      null,
      null
    ];
    
    orgs.forEach((org, orgIndex) => {
      const binCount = orgIndex === 0 ? 5 : 4; // PopCycle gets 5 bins, others get 4
      for (let i = 0; i < binCount; i++) {
        const qrCode = generateQRCode(orgIndex, 'bin');
        
        // Calculate collection dates - last collection 1-10 days ago, next collection 1-7 days from now
        const lastCollectionDate = new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000);
        const nextCollectionDate = new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000);
        
        const binStatuses = ['bin_on_vehicle', 'bin_on_site', 'ready_for_processing'] as const;
        
        // Assign random event to some bins (40% chance)
        const hasEvent = Math.random() > 0.6;
        const eventName = hasEvent ? eventNames[Math.floor(Math.random() * eventNames.length)] : null;
        
        bins.push({
          _id: qrCode,
          orgId: org._id,
          name: `${org.name} Bin ${i + 1}`,
          type: orgIndex === 0 ? 'permanent' as const : (orgIndex === 1 ? 'permanent' as const : 'temporary' as const),
          location: i === 0 ? 'Main Entrance' : `Location ${String.fromCharCode(65 + i)}`,
          capacity: 50,
          isActive: true,
          canBeAdopted: true,
          adoptedBy: i === 0 ? 'Education Team' : undefined,
          status: binStatuses[Math.floor(Math.random() * binStatuses.length)],
          event: eventName, // Add event field for actual events like parties, festivals
          lastCollectionDate,
          nextCollectionDate,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });
    
    await db.collection('bins').insertMany(bins);
    
    // Generate Batches with QR codes (each batch combines multiple bins)
    const batches: any[] = [];
    const usedBinIds = new Set();
    const materialTypes = ['HDPE', 'PET', 'PP', 'mixed'] as const;
    const statuses = ['collected', 'rough_wash', 'sort', 'first_dry', 'shred', 'fine_wash', 'second_dry', 'press', 'weigh_photo', 'laser_marking', 'inventory_creation'] as const;
    const collectors = ['John Smith', 'Maria Garcia', 'David Chen'];
    
    // Create batches that combine 2-4 bins each
    const batchCount = 15; // Create 15 batches total
    for (let batchIndex = 0; batchIndex < batchCount; batchIndex++) {
      const availableBins = bins.filter(bin => !usedBinIds.has(bin._id));
      if (availableBins.length === 0) break; // No more bins available
      
      // Select 1-2 random bins for this batch (to allow more batches)
      const binsPerBatch = Math.min(Math.floor(Math.random() * 2) + 1, availableBins.length);
      const selectedBins: any[] = [];
      for (let i = 0; i < binsPerBatch; i++) {
        const randomIndex = Math.floor(Math.random() * availableBins.length);
        const selectedBin = availableBins.splice(randomIndex, 1)[0];
        selectedBins.push(selectedBin);
        usedBinIds.add(selectedBin._id);
      }
      
      // Use the first bin's org for QR code generation
      const orgIndex = orgs.findIndex(org => org._id.equals(selectedBins[0].orgId));
      const qrCode = generateQRCode(orgIndex, 'batch');
      
      // Calculate total weight from all bins
      const totalWeight = selectedBins.reduce((sum, bin) => sum + (Math.random() * 15 + 3), 0);
      
      // Assign different processing stages - more completed batches for more blanks
      let batchStatus;
      if (batchIndex < 6) {
        batchStatus = 'inventory_creation'; // First 6 batches are complete
      } else if (batchIndex === 6) {
        batchStatus = 'laser_marking'; // Almost complete
      } else if (batchIndex === 7) {
        batchStatus = 'weigh_photo'; // Near end
      } else if (batchIndex === 8) {
        batchStatus = 'press'; // Mid-stage
      } else if (batchIndex === 9) {
        batchStatus = 'second_dry'; // Mid-stage
      } else if (batchIndex === 10) {
        batchStatus = 'fine_wash'; // Mid-stage
      } else if (batchIndex === 11) {
        batchStatus = 'first_dry'; // Early-mid stage
      } else if (batchIndex === 12) {
        batchStatus = 'shred'; // Early-mid stage
      } else if (batchIndex === 13) {
        batchStatus = 'sort'; // Early stage
      } else if (batchIndex === 14) {
        batchStatus = 'rough_wash'; // Very early stage
      } else {
        batchStatus = 'collected'; // Just collected
      }
      
      batches.push({
        _id: qrCode,
        binIds: selectedBins.map(bin => bin._id), // Array of bin IDs
        collectionDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        weight: Math.round(totalWeight * 10) / 10,
        materialType: materialTypes[Math.floor(Math.random() * materialTypes.length)],
        collectedBy: collectors[Math.floor(Math.random() * collectors.length)],
        status: batchStatus,
        notes: batchIndex === 0 ? 'High quality plastic from multiple collection points' : undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    await db.collection('batches').insertMany(batches);
    
    // Generate Products
    const products = [
      {
        _id: new ObjectId(),
        name: 'STEM Desk Organizer',
        description: 'Modular desk organizer perfect for classrooms and maker spaces',
        category: 'educational_kit' as const,
        difficulty: 'easy' as const,
        estimatedAssemblyTime: 30,
        materialRequirements: {
          plasticType: 'HDPE' as const,
          weight: 0.5
        },
        designFiles: {
          instructionsPdf: 'desk-organizer-instructions.pdf',
          templateSvg: 'desk-organizer-template.svg',
          photos: ['desk-organizer-1.jpg', 'desk-organizer-2.jpg']
        },
        price: 15.99,
        inStock: true,
        rating: 4.8,
        reviewCount: 127,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Ocean Cleanup Assembly Kit',
        description: 'Educational kit teaching ocean conservation through hands-on building',
        category: 'educational_kit' as const,
        difficulty: 'medium' as const,
        estimatedAssemblyTime: 45,
        materialRequirements: {
          plasticType: 'PET' as const,
          weight: 0.8
        },
        designFiles: {
          instructionsPdf: 'ocean-cleanup-instructions.pdf',
          photos: ['ocean-cleanup-1.jpg', 'ocean-cleanup-2.jpg', 'ocean-cleanup-3.jpg']
        },
        price: 24.99,
        inStock: true,
        rating: 4.9,
        reviewCount: 89,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    await db.collection('products').insertMany(products);
    
    // Generate Users first (needed for blanks assembly)
    const users = [
      {
        _id: new ObjectId(),
        name: 'Admin User',
        email: 'admin@popcycle.org',
        userType: 'super_admin' as const,
        skillLevel: 'advanced' as const,
        itemsAssembled: 150,
        totalHoursLogged: 200,
        favoriteProducts: [products[0]._id],
        assemblyStories: [],
        permissions: ['admin', 'operations', 'crm', 'financial'],
        assignedRoutes: [],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Operations Staff',
        email: 'ops@popcycle.org',
        userType: 'staff' as const,
        skillLevel: 'advanced' as const,
        itemsAssembled: 75,
        totalHoursLogged: 120,
        favoriteProducts: [],
        assemblyStories: [],
        permissions: ['operations'],
        assignedRoutes: ['downtown-la', 'santa-ana'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Sarah Martinez',
        email: 'sarah@discoverycube.org',
        userType: 'partner_owner' as const,
        orgId: orgs[0]._id,
        skillLevel: 'intermediate' as const,
        itemsAssembled: 25,
        totalHoursLogged: 30,
        favoriteProducts: [],
        assemblyStories: [],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    await db.collection('users').insertMany(users);
    
    // Generate Blanks with QR codes - only for batches that finished processing 
    const blanks: any[] = [];
    const completedBatches = batches.filter(batch => batch.status === 'inventory_creation');
    
    completedBatches.forEach((batch, batchIndex) => {
      const orgIndex = orgs.findIndex(org => {
        const bin = bins.find(b => batch.binIds && batch.binIds.includes(b._id));
        return bin && org._id.equals(bin.orgId);
      });
      
      // Generate 5-8 blanks per completed batch (6 batches = ~30-40 blanks total)
      const blankCount = Math.floor(Math.random() * 4) + 5;
      for (let i = 0; i < blankCount; i++) {
        const qrCode = generateQRCode(orgIndex, 'item');
        
        // Logical progression: blank -> purchased -> assembled
        const hasPurchase = Math.random() > 0.3; // 70% chance of being purchased
        const hasAssembly = hasPurchase && Math.random() > 0.4; // 60% of purchased items get assembled
        
        let itemType: 'blank' | 'finished' = 'blank';
        let status: 'blank' | 'assembled' = 'blank';
        
        if (hasAssembly) {
          itemType = 'finished';
          status = 'assembled';
        }
        
        blanks.push({
          _id: qrCode,
          batchId: batch._id,
          productId: hasPurchase ? products[Math.floor(Math.random() * products.length)]._id : null,
          userId: hasAssembly ? users[Math.floor(Math.random() * users.length)]._id : null,
          type: itemType,
          status: status,
          weight: Math.round((Math.random() * 0.5 + 0.2) * 100) / 100,
          assemblyDate: hasAssembly ? new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000) : undefined,
          deliveryDate: hasAssembly && Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : undefined,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });
    
    await db.collection('blanks').insertMany(blanks);
    
    // Generate Orders
    const orders = [
      {
        _id: new ObjectId(),
        orderNumber: 'ORD-2025-001',
        orgId: orgs[0]._id,
        type: 'collection_service' as const,
        status: 'completed' as const,
        serviceDescription: 'Monthly plastic collection and processing for Discovery Cube',
        contractReference: 'CONTRACT-DC-2025',
        lineItems: [
          {
            itemType: 'collection' as const,
            description: 'Plastic waste collection and transportation',
            quantity: 3,
            unitPrice: 150.00,
            totalPrice: 450.00,
            batchIds: batches.slice(0, 2).map(b => b._id)
          },
          {
            itemType: 'processing' as const,
            description: 'Plastic sorting, cleaning, and processing',
            quantity: 45.5,
            unitPrice: 5.00,
            totalPrice: 227.50
          }
        ],
        subtotal: 677.50,
        tax: 61.00,
        total: 738.50,
        invoiceId: 'QB-INV-001',
        orderDate: new Date('2025-01-15'),
        expectedCompletionDate: new Date('2025-02-15'),
        completedDate: new Date('2025-02-10'),
        invoicedDate: new Date('2025-02-12'),
        assignedStaff: [users[1]._id],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        orderNumber: 'ORD-2025-002',
        orgId: orgs[1]._id,
        type: 'product_delivery' as const,
        status: 'in_progress' as const,
        serviceDescription: 'Custom educational kit delivery for LA Plaza de Cultura y Artes',
        lineItems: [
          {
            itemType: 'product' as const,
            description: 'Ocean Cleanup Assembly Kits',
            quantity: 50,
            unitPrice: 24.99,
            totalPrice: 1249.50,
            productIds: [products[1]._id]
          }
        ],
        subtotal: 1249.50,
        tax: 112.46,
        total: 1361.96,
        orderDate: new Date('2025-02-01'),
        expectedCompletionDate: new Date('2025-02-28'),
        assignedStaff: [users[1]._id],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    await db.collection('orders').insertMany(orders);
    
    await client.close();
    
    // Sample QR codes for demonstration
    const sampleQRCodes = {
      bins: bins.slice(0, 3).map(b => ({ id: b._id, name: b.name })),
      batches: batches.slice(0, 3).map(b => ({ id: b._id, binIds: b.binIds })),
      blanks: blanks.slice(0, 3).map(b => ({ id: b._id, batchId: b.batchId }))
    };
    
    return NextResponse.json({
      success: true,
      message: 'Sample data generated successfully',
      summary: {
        organizations: orgs.length,
        bins: bins.length,
        batches: batches.length,
        blanks: blanks.length,
        users: users.length,
        products: products.length,
        orders: orders.length
      },
      sampleQRCodes
    });
    
  } catch (error) {
    console.error('Error generating sample data:', error);
    return NextResponse.json(
      { error: 'Failed to generate sample data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}