import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// Base36 encoding for partner IDs (supports up to 46,655 partners)
function encodePartnerBase36(partnerId: number): string {
  return partnerId.toString(36).toUpperCase().padStart(3, '0');
}

// Generate QR code IDs with partner branding
function generateQRCode(partnerIndex: number, type: 'bin' | 'batch' | 'item', sequence: number): string {
  const partnerHash = encodePartnerBase36(partnerIndex + 1); // Start from 1
  const typePrefix = {
    bin: 'BIN',
    batch: 'BAT', 
    item: 'BLK' // "Blank" for items
  }[type];
  
  const seqStr = sequence.toString(36).toUpperCase().padStart(6, '0');
  return `${partnerHash}${typePrefix}${seqStr}`;
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
    const collections = ['orgs', 'bins', 'batches', 'items', 'users', 'products', 'orders'];
    for (const collName of collections) {
      await db.collection(collName).deleteMany({});
    }
    
    // Generate Organizations (Partners)
    const orgs = [
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
    orgs.forEach((org, orgIndex) => {
      const binCount = orgIndex === 0 ? 3 : 2;
      for (let i = 0; i < binCount; i++) {
        bins.push({
          _id: new ObjectId(),
          qrCode: generateQRCode(orgIndex, 'bin', bins.length + 1),
          orgId: org._id,
          name: `${org.name} Bin ${i + 1}`,
          type: orgIndex === 0 ? 'permanent' as const : 'temporary' as const,
          location: i === 0 ? 'Main Entrance' : `Location ${String.fromCharCode(65 + i)}`,
          capacity: 50,
          isActive: true,
          canBeAdopted: true,
          adoptedBy: i === 0 ? 'Education Team' : undefined,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });
    
    await db.collection('bins').insertMany(bins);
    
    // Generate Batches with QR codes
    const batches: any[] = [];
    bins.forEach((bin, binIndex) => {
      const batchCount = binIndex % 2 === 0 ? 2 : 1;
      for (let i = 0; i < batchCount; i++) {
        const orgIndex = orgs.findIndex(org => org._id.equals(bin.orgId));
        const materialTypes = ['HDPE', 'PET', 'PP', 'mixed'] as const;
        const statuses = ['collected', 'sorted', 'cleaned', 'processed'] as const;
        const collectors = ['John Smith', 'Maria Garcia', 'David Chen'];
        
        batches.push({
          _id: new ObjectId(),
          qrCode: generateQRCode(orgIndex, 'batch', batches.length + 1),
          binId: bin._id,
          collectionDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          weight: Math.round((Math.random() * 20 + 5) * 10) / 10,
          materialType: materialTypes[Math.floor(Math.random() * materialTypes.length)],
          collectedBy: collectors[Math.floor(Math.random() * collectors.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          notes: i === 0 ? 'High quality plastic, minimal contamination' : undefined,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });
    
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
    
    // Generate Items with QR codes
    const items: any[] = [];
    batches.forEach((batch, batchIndex) => {
      const orgIndex = orgs.findIndex(org => {
        const bin = bins.find(b => b._id.equals(batch.binId));
        return bin && org._id.equals(bin.orgId);
      });
      
      const itemCount = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < itemCount; i++) {
        const isFinished = Math.random() > 0.3;
        items.push({
          _id: new ObjectId(),
          qrCode: generateQRCode(orgIndex, 'item', items.length + 1),
          batchId: batch._id,
          productId: isFinished ? products[Math.floor(Math.random() * products.length)]._id : undefined,
          userId: isFinished ? undefined : undefined,
          type: isFinished ? 'finished' as const : 'blank' as const,
          status: isFinished ? 'assembled' as const : 'blank' as const,
          weight: Math.round((Math.random() * 0.5 + 0.2) * 100) / 100,
          assemblyDate: isFinished ? new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000) : undefined,
          deliveryDate: isFinished && Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : undefined,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });
    
    await db.collection('items').insertMany(items);
    
    // Generate Users
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
      bins: bins.slice(0, 3).map(b => ({ id: b._id, qrCode: b.qrCode, name: b.name })),
      batches: batches.slice(0, 3).map(b => ({ id: b._id, qrCode: b.qrCode, binId: b.binId })),
      items: items.slice(0, 3).map(i => ({ id: i._id, qrCode: i.qrCode, batchId: i.batchId }))
    };
    
    return NextResponse.json({
      success: true,
      message: 'Sample data generated successfully',
      summary: {
        organizations: orgs.length,
        bins: bins.length,
        batches: batches.length,
        items: items.length,
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