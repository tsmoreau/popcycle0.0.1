const { MongoClient, ObjectId } = require('mongodb');

// Base36 encoding for partner IDs (supports up to 46,655 partners)
function encodePartnerBase36(partnerId) {
  return partnerId.toString(36).toUpperCase().padStart(3, '0');
}

// Generate QR code IDs with partner branding
function generateQRCode(partnerIndex, type, sequence) {
  const partnerHash = encodePartnerBase36(partnerIndex + 1); // Start from 1
  const typePrefix = {
    bin: 'BIN',
    batch: 'BAT', 
    item: 'BLK' // "Blank" for items
  }[type];
  
  const seqStr = sequence.toString(36).toUpperCase().padStart(6, '0');
  return `${partnerHash}${typePrefix}${seqStr}`;
}

// Sample data generation
async function generateSampleData() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI environment variable not set');
    return;
  }

  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('PopCycle');
    
    // Clear existing data
    console.log('Clearing existing collections...');
    const collections = ['orgs', 'bins', 'batches', 'items', 'users', 'products', 'orders'];
    for (const collName of collections) {
      await db.collection(collName).deleteMany({});
    }
    
    // Generate Organizations (Partners)
    console.log('Creating organizations...');
    const orgs = [
      {
        _id: new ObjectId(),
        name: 'Discovery Cube',
        slug: 'discoverycube',
        type: 'educational',
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
            type: 'recurring',
            description: 'Weekly summer camps with plastic collection activities',
            scheduledDate: new Date('2025-06-15'),
            location: 'Main Exhibition Hall',
            binIds: [],
            status: 'planned'
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Museum of Science Boston',
        slug: 'museumofscience',
        type: 'educational',
        description: 'Leading science museum with sustainability programs',
        contactInfo: {
          email: 'sustainability@mos.org',
          phone: '(617) 723-2500',
          address: '1 Science Park, Boston, MA 02114',
          website: 'https://www.mos.org'
        },
        branding: {
          primaryColor: '#0066CC',
          secondaryColor: '#FF9900',
          trackingPageMessage: 'Your Museum of Science visit helped create educational materials from recycled plastic!'
        },
        events: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Ace Hotel Downtown LA',
        slug: 'acehotel',
        type: 'corporate',
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
    console.log(`Created ${orgs.length} organizations`);
    
    // Generate Bins with QR codes
    console.log('Creating bins with QR codes...');
    const bins = [];
    orgs.forEach((org, orgIndex) => {
      // 2-3 bins per organization
      const binCount = orgIndex === 0 ? 3 : 2;
      for (let i = 0; i < binCount; i++) {
        bins.push({
          _id: new ObjectId(),
          qrCode: generateQRCode(orgIndex, 'bin', bins.length + 1),
          orgId: org._id,
          name: `${org.name} Bin ${i + 1}`,
          type: orgIndex === 0 ? 'permanent' : 'temporary',
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
    console.log(`Created ${bins.length} bins`);
    
    // Generate Batches with QR codes
    console.log('Creating batches...');
    const batches = [];
    bins.forEach((bin, binIndex) => {
      // 1-2 batches per bin
      const batchCount = binIndex % 2 === 0 ? 2 : 1;
      for (let i = 0; i < batchCount; i++) {
        const orgIndex = orgs.findIndex(org => org._id.equals(bin.orgId));
        batches.push({
          _id: new ObjectId(),
          qrCode: generateQRCode(orgIndex, 'batch', batches.length + 1),
          binId: bin._id,
          collectionDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
          weight: Math.round((Math.random() * 20 + 5) * 10) / 10, // 5-25 kg
          materialType: ['HDPE', 'PET', 'PP', 'mixed'][Math.floor(Math.random() * 4)],
          collectedBy: ['John Smith', 'Maria Garcia', 'David Chen'][Math.floor(Math.random() * 3)],
          status: ['collected', 'sorted', 'cleaned', 'processed'][Math.floor(Math.random() * 4)],
          notes: i === 0 ? 'High quality plastic, minimal contamination' : undefined,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });
    
    await db.collection('batches').insertMany(batches);
    console.log(`Created ${batches.length} batches`);
    
    // Generate Products
    console.log('Creating products...');
    const products = [
      {
        _id: new ObjectId(),
        name: 'STEM Desk Organizer',
        description: 'Modular desk organizer perfect for classrooms and maker spaces',
        category: 'educational_kit',
        difficulty: 'easy',
        estimatedAssemblyTime: 30,
        materialRequirements: {
          plasticType: 'HDPE',
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
        category: 'educational_kit',
        difficulty: 'medium',
        estimatedAssemblyTime: 45,
        materialRequirements: {
          plasticType: 'PET',
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
    console.log(`Created ${products.length} products`);
    
    // Generate Items with QR codes
    console.log('Creating items...');
    const items = [];
    batches.forEach((batch, batchIndex) => {
      const orgIndex = orgs.findIndex(org => {
        const bin = bins.find(b => b._id.equals(batch.binId));
        return bin && org._id.equals(bin.orgId);
      });
      
      // 2-4 items per batch
      const itemCount = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < itemCount; i++) {
        const isFinished = Math.random() > 0.3; // 70% finished, 30% blanks
        items.push({
          _id: new ObjectId(),
          qrCode: generateQRCode(orgIndex, 'item', items.length + 1),
          batchId: batch._id,
          productId: isFinished ? products[Math.floor(Math.random() * products.length)]._id : undefined,
          type: isFinished ? 'finished' : 'blank',
          status: isFinished ? 'assembled' : 'blank',
          weight: Math.round((Math.random() * 0.5 + 0.2) * 100) / 100, // 0.2-0.7 kg
          assemblyDate: isFinished ? new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000) : undefined,
          deliveryDate: isFinished && Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : undefined,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });
    
    await db.collection('items').insertMany(items);
    console.log(`Created ${items.length} items`);
    
    // Generate Users
    console.log('Creating users...');
    const users = [
      {
        _id: new ObjectId(),
        name: 'Admin User',
        email: 'admin@popcycle.org',
        userType: 'super_admin',
        skillLevel: 'advanced',
        itemsAssembled: 150,
        totalHoursLogged: 200,
        permissions: ['admin', 'operations', 'crm', 'financial'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Operations Staff',
        email: 'ops@popcycle.org',
        userType: 'staff',
        skillLevel: 'advanced',
        itemsAssembled: 75,
        totalHoursLogged: 120,
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
        userType: 'partner_owner',
        orgId: orgs[0]._id,
        skillLevel: 'intermediate',
        itemsAssembled: 25,
        totalHoursLogged: 30,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    await db.collection('users').insertMany(users);
    console.log(`Created ${users.length} users`);
    
    // Generate Orders
    console.log('Creating orders...');
    const orders = [
      {
        _id: new ObjectId(),
        orderNumber: 'ORD-2025-001',
        orgId: orgs[0]._id,
        type: 'collection_service',
        status: 'completed',
        serviceDescription: 'Monthly plastic collection and processing for Discovery Cube',
        lineItems: [
          {
            itemType: 'collection',
            description: 'Plastic waste collection and transportation',
            quantity: 3,
            unitPrice: 150.00,
            totalPrice: 450.00,
            batchIds: batches.slice(0, 2).map(b => b._id)
          },
          {
            itemType: 'processing',
            description: 'Plastic sorting, cleaning, and processing',
            quantity: 45.5,
            unitPrice: 5.00,
            totalPrice: 227.50
          }
        ],
        subtotal: 677.50,
        tax: 61.00,
        total: 738.50,
        orderDate: new Date('2025-01-15'),
        expectedCompletionDate: new Date('2025-02-15'),
        completedDate: new Date('2025-02-10'),
        assignedStaff: [users[1]._id],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        orderNumber: 'ORD-2025-002',
        orgId: orgs[1]._id,
        type: 'product_delivery',
        status: 'in_progress',
        serviceDescription: 'Custom educational kit delivery for Museum of Science Boston',
        lineItems: [
          {
            itemType: 'product',
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
    console.log(`Created ${orders.length} orders`);
    
    console.log('\n✅ Sample data generation complete!');
    console.log('Summary:');
    console.log(`- ${orgs.length} Organizations`);
    console.log(`- ${bins.length} Bins with QR codes`);
    console.log(`- ${batches.length} Batches with QR codes`);
    console.log(`- ${items.length} Items with QR codes`);
    console.log(`- ${users.length} Users`);
    console.log(`- ${products.length} Products`);
    console.log(`- ${orders.length} Orders`);
    
    // Show some sample QR codes
    console.log('\n🔍 Sample QR Codes:');
    console.log('Bins:', bins.slice(0, 3).map(b => b.qrCode).join(', '));
    console.log('Batches:', batches.slice(0, 3).map(b => b.qrCode).join(', '));
    console.log('Items:', items.slice(0, 3).map(i => i.qrCode).join(', '));
    
  } catch (error) {
    console.error('Error generating sample data:', error);
  } finally {
    await client.close();
  }
}

// Run the script
if (require.main === module) {
  generateSampleData();
}

module.exports = { generateSampleData, encodePartnerBase36, generateQRCode };