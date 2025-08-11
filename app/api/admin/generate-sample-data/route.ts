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
        events: [
          {
            eventId: 'cultural-workshop-2025',
            name: 'Cultural Workshop Series 2025',
            type: 'recurring' as const,
            description: 'Monthly workshops highlighting sustainability in Mexican culture',
            scheduledDate: new Date('2025-03-15'),
            location: 'Main Gallery',
            binIds: [],
            status: 'planned' as const
          }
        ],
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
        events: [
          {
            eventId: 'sustainability-week-2025',
            name: 'Sustainability Week 2025',
            type: 'ad_hoc' as const,
            description: 'Week-long sustainability initiative for hotel guests',
            scheduledDate: new Date('2025-04-01'),
            location: 'Hotel Lobby & Restaurant',
            binIds: [],
            status: 'planned' as const
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    await db.collection('orgs').insertMany(orgs);
    
    // Generate Bins with QR codes
    const bins: any[] = [];
    
    orgs.forEach((org, orgIndex) => {
      const binCount = orgIndex === 0 ? 5 : 4; // PopCycle gets 5 bins, others get 4
      for (let i = 0; i < binCount; i++) {
        const qrCode = generateQRCode(orgIndex, 'bin');
        
        // Calculate collection dates - last collection 1-10 days ago, next collection 1-7 days from now
        const lastCollectionDate = new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000);
        const nextCollectionDate = new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000);
        
        const binStatuses = ['bin_on_vehicle', 'bin_on_site', 'ready_for_processing'] as const;
        
        // Assign some bins to events defined in the org (30% chance)
        let eventId: string | undefined = undefined;
        if (org.events.length > 0 && Math.random() > 0.7) {
          eventId = org.events[Math.floor(Math.random() * org.events.length)].eventId;
        }
        
        const adoptedBy = i === 0 ? 'Education Team' : undefined;
        
        // Generate custom message only for bins with adoption or event association
        let customMessage: string | undefined = undefined;
        if (adoptedBy) {
          // Adopted bins get team-specific messages
          const teamMessages = [
            'This bin is proudly maintained by our Education Team - every bottle you recycle becomes part of our learning materials!',
            'The Education Team thanks you for contributing to our hands-on sustainability curriculum.',
            'Your recycling here directly supports our educational programs and student projects.'
          ];
          customMessage = teamMessages[Math.floor(Math.random() * teamMessages.length)];
        } else if (eventId) {
          // Event-specific bins get event-themed messages
          const eventMessages = [
            'Thank you for participating in our special event! Your plastic will become educational materials celebrating this experience.',
            'This event collection will be transformed into commemorative items showcasing our partnership.',
            'Your contribution during this event helps create lasting educational impact beyond today.'
          ];
          customMessage = eventMessages[Math.floor(Math.random() * eventMessages.length)];
        }
        
        bins.push({
          _id: qrCode,
          orgId: org._id,
          eventId: eventId,
          name: `${org.name} Bin ${i + 1}`,
          type: orgIndex === 0 ? 'permanent' as const : (orgIndex === 1 ? 'permanent' as const : 'temporary' as const),
          location: i === 0 ? 'Main Entrance' : `Location ${String.fromCharCode(65 + i)}`,
          capacity: 50,
          isActive: true,
          canBeAdopted: true,
          adoptedBy: adoptedBy,
          message: customMessage,
          status: binStatuses[Math.floor(Math.random() * binStatuses.length)],
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
    
    // Generate Products with new categories
    const products = [
      // Flora & Fauna (2 products)
      {
        _id: new ObjectId(),
        name: 'Butterfly Garden Mobile',
        description: 'Delicate kinetic mobile featuring colorful butterfly sculptures that dance in the breeze',
        category: 'flora_fauna' as const,
        difficulty: 'medium' as const,
        estimatedAssemblyTime: 90,
        materialRequirements: {
          plasticType: 'PET' as const,
          weight: 0.8
        },
        designFiles: {
          instructionsPdf: 'butterfly-mobile-instructions.pdf',
          templateSvg: 'butterfly-template.svg',
          photos: ['butterfly-mobile-1.jpg', 'butterfly-mobile-2.jpg']
        },
        assets: [
          {
            id: 'butterfly-main-1',
            type: 'image',
            url: '/images/products/butterfly-mobile-main.jpg',
            thumbnail: '/images/products/thumbs/butterfly-mobile-main.jpg',
            alt: 'Butterfly Garden Mobile hanging display',
            description: 'Colorful butterfly mobile in natural setting',
            isPrimary: true,
            order: 1
          },
          {
            id: 'butterfly-detail-1',
            type: 'image',
            url: '/images/products/butterfly-mobile-detail.jpg',
            thumbnail: '/images/products/thumbs/butterfly-mobile-detail.jpg',
            alt: 'Close-up of butterfly sculptures',
            description: 'Detailed view of individual butterfly elements',
            isPrimary: false,
            order: 2
          }
        ],
        price: 32.99,
        inStock: true,
        rating: 4.7,
        reviewCount: 43,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Succulent Planter Set',
        description: 'Modern geometric planters perfect for small succulents and air plants',
        category: 'flora_fauna' as const,
        difficulty: 'easy' as const,
        estimatedAssemblyTime: 45,
        materialRequirements: {
          plasticType: 'HDPE' as const,
          weight: 1.2
        },
        designFiles: {
          instructionsPdf: 'succulent-planter-instructions.pdf',
          photos: ['succulent-planter-1.jpg', 'succulent-planter-2.jpg']
        },
        assets: [
          {
            id: 'succulent-main-1',
            type: 'image',
            url: '/images/products/succulent-planter-main.jpg',
            thumbnail: '/images/products/thumbs/succulent-planter-main.jpg',
            alt: 'Geometric succulent planter set',
            description: 'Modern planters with live succulents',
            isPrimary: true,
            order: 1
          }
        ],
        price: 28.50,
        inStock: true,
        rating: 4.8,
        reviewCount: 67,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Kinetic Sculptures (3 products)
      {
        _id: new ObjectId(),
        name: 'Wave Motion Pendulum',
        description: 'Mesmerizing kinetic sculpture demonstrating wave physics through synchronized pendulum motion',
        category: 'kinetic_sculptures' as const,
        difficulty: 'hard' as const,
        estimatedAssemblyTime: 180,
        materialRequirements: {
          plasticType: 'PET' as const,
          weight: 2.1
        },
        designFiles: {
          instructionsPdf: 'wave-pendulum-instructions.pdf',
          templateSvg: 'pendulum-template.svg',
          photos: ['wave-pendulum-1.jpg', 'wave-pendulum-2.jpg']
        },
        assets: [
          {
            id: 'pendulum-main-1',
            type: 'image',
            url: '/images/products/wave-pendulum-main.jpg',
            thumbnail: '/images/products/thumbs/wave-pendulum-main.jpg',
            alt: 'Wave Motion Pendulum sculpture',
            description: 'Kinetic pendulum showing wave motion',
            isPrimary: true,
            order: 1
          },
          {
            id: 'pendulum-motion-vid',
            type: 'video',
            url: '/videos/products/pendulum-motion.mp4',
            thumbnail: '/images/products/thumbs/pendulum-motion-thumb.jpg',
            alt: 'Pendulum motion demonstration',
            description: 'Video showing mesmerizing wave motion',
            isPrimary: false,
            order: 2
          }
        ],
        price: 89.99,
        inStock: true,
        rating: 4.9,
        reviewCount: 28,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Wind Spiral Tower',
        description: 'Elegant vertical sculpture that spins and rotates in response to air currents',
        category: 'kinetic_sculptures' as const,
        difficulty: 'medium' as const,
        estimatedAssemblyTime: 120,
        materialRequirements: {
          plasticType: 'PP' as const,
          weight: 1.5
        },
        designFiles: {
          instructionsPdf: 'wind-spiral-instructions.pdf',
          photos: ['wind-spiral-1.jpg', 'wind-spiral-2.jpg']
        },
        assets: [
          {
            id: 'spiral-main-1',
            type: 'image',
            url: '/images/products/wind-spiral-main.jpg',
            thumbnail: '/images/products/thumbs/wind-spiral-main.jpg',
            alt: 'Wind Spiral Tower sculpture',
            description: 'Tall kinetic tower sculpture spinning in wind',
            isPrimary: true,
            order: 1
          }
        ],
        price: 64.50,
        inStock: false,
        rating: 4.6,
        reviewCount: 19,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Balance Point Mobile',
        description: 'Delicate kinetic balance sculpture exploring equilibrium and motion',
        category: 'kinetic_sculptures' as const,
        difficulty: 'medium' as const,
        estimatedAssemblyTime: 90,
        materialRequirements: {
          plasticType: 'PET' as const,
          weight: 0.9
        },
        designFiles: {
          instructionsPdf: 'balance-mobile-instructions.pdf',
          photos: ['balance-mobile-1.jpg']
        },
        assets: [
          {
            id: 'balance-main-1',
            type: 'image',
            url: '/images/products/balance-mobile-main.jpg',
            thumbnail: '/images/products/thumbs/balance-mobile-main.jpg',
            alt: 'Balance Point Mobile sculpture',
            description: 'Kinetic balance mobile in motion',
            isPrimary: true,
            order: 1
          }
        ],
        price: 45.75,
        inStock: true,
        rating: 4.5,
        reviewCount: 32,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Vehicles & Vessels (2 products)
      {
        _id: new ObjectId(),
        name: 'Solar Racing Car Kit',
        description: 'Build and race your own solar-powered vehicle with this comprehensive kit',
        category: 'vehicles_vessels' as const,
        difficulty: 'hard' as const,
        estimatedAssemblyTime: 240,
        materialRequirements: {
          plasticType: 'HDPE' as const,
          weight: 2.8
        },
        designFiles: {
          instructionsPdf: 'solar-car-instructions.pdf',
          templateSvg: 'car-chassis-template.svg',
          photos: ['solar-car-1.jpg', 'solar-car-2.jpg', 'solar-car-3.jpg']
        },
        assets: [
          {
            id: 'solar-car-main-1',
            type: 'image',
            url: '/images/products/solar-car-main.jpg',
            thumbnail: '/images/products/thumbs/solar-car-main.jpg',
            alt: 'Solar Racing Car complete kit',
            description: 'Assembled solar car ready for racing',
            isPrimary: true,
            order: 1
          },
          {
            id: 'solar-car-build-vid',
            type: 'video',
            url: '/videos/products/solar-car-build.mp4',
            thumbnail: '/images/products/thumbs/solar-build-thumb.jpg',
            alt: 'Solar car assembly tutorial',
            description: 'Complete build tutorial video',
            isPrimary: false,
            order: 2
          }
        ],
        price: 125.00,
        inStock: true,
        rating: 4.8,
        reviewCount: 156,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Paddle Boat Explorer',
        description: 'Floating vessel kit perfect for pool and pond adventures',
        category: 'vehicles_vessels' as const,
        difficulty: 'medium' as const,
        estimatedAssemblyTime: 90,
        materialRequirements: {
          plasticType: 'HDPE' as const,
          weight: 1.8
        },
        designFiles: {
          instructionsPdf: 'paddle-boat-instructions.pdf',
          photos: ['paddle-boat-1.jpg', 'paddle-boat-2.jpg']
        },
        assets: [
          {
            id: 'boat-main-1',
            type: 'image',
            url: '/images/products/paddle-boat-main.jpg',
            thumbnail: '/images/products/thumbs/paddle-boat-main.jpg',
            alt: 'Paddle Boat Explorer on water',
            description: 'Paddle boat floating on calm water',
            isPrimary: true,
            order: 1
          }
        ],
        price: 38.75,
        inStock: true,
        rating: 4.4,
        reviewCount: 73,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Pop Bots (3 products)
      {
        _id: new ObjectId(),
        name: 'Walking Wobble Bot',
        description: 'Colorful robot that walks with a distinctive wobbling gait',
        category: 'pop_bots' as const,
        difficulty: 'easy' as const,
        estimatedAssemblyTime: 60,
        materialRequirements: {
          plasticType: 'PP' as const,
          weight: 0.6
        },
        designFiles: {
          instructionsPdf: 'wobble-bot-instructions.pdf',
          photos: ['wobble-bot-1.jpg', 'wobble-bot-2.jpg']
        },
        assets: [
          {
            id: 'wobble-bot-main-1',
            type: 'image',
            url: '/images/products/wobble-bot-main.jpg',
            thumbnail: '/images/products/thumbs/wobble-bot-main.jpg',
            alt: 'Walking Wobble Bot robot',
            description: 'Colorful wobbling robot toy',
            isPrimary: true,
            order: 1
          },
          {
            id: 'wobble-action-vid',
            type: 'video',
            url: '/videos/products/wobble-bot-action.mp4',
            thumbnail: '/images/products/thumbs/wobble-action-thumb.jpg',
            alt: 'Wobble bot walking demonstration',
            description: 'Robot demonstrating wobbling walk',
            isPrimary: false,
            order: 2
          }
        ],
        price: 22.50,
        inStock: true,
        rating: 4.7,
        reviewCount: 94,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Light Chaser Bot',
        description: 'Smart robot that follows light sources and responds to shadows',
        category: 'pop_bots' as const,
        difficulty: 'hard' as const,
        estimatedAssemblyTime: 200,
        materialRequirements: {
          plasticType: 'PET' as const,
          weight: 1.1
        },
        designFiles: {
          instructionsPdf: 'light-chaser-instructions.pdf',
          templateSvg: 'robot-body-template.svg',
          photos: ['light-chaser-1.jpg', 'light-chaser-2.jpg']
        },
        assets: [
          {
            id: 'light-chaser-main-1',
            type: 'image',
            url: '/images/products/light-chaser-main.jpg',
            thumbnail: '/images/products/thumbs/light-chaser-main.jpg',
            alt: 'Light Chaser Bot with sensors',
            description: 'Advanced robot with light-sensing capability',
            isPrimary: true,
            order: 1
          }
        ],
        price: 67.25,
        inStock: true,
        rating: 4.9,
        reviewCount: 47,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Spin Dance Bot',
        description: 'Entertaining robot that spins and dances to music rhythms',
        category: 'pop_bots' as const,
        difficulty: 'medium' as const,
        estimatedAssemblyTime: 105,
        materialRequirements: {
          plasticType: 'PP' as const,
          weight: 0.8
        },
        designFiles: {
          instructionsPdf: 'spin-bot-instructions.pdf',
          photos: ['spin-bot-1.jpg']
        },
        assets: [
          {
            id: 'spin-bot-main-1',
            type: 'image',
            url: '/images/products/spin-bot-main.jpg',
            thumbnail: '/images/products/thumbs/spin-bot-main.jpg',
            alt: 'Spin Dance Bot in action',
            description: 'Dancing robot with spinning motion',
            isPrimary: true,
            order: 1
          }
        ],
        price: 41.00,
        inStock: false,
        rating: 4.6,
        reviewCount: 61,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Everyday Objects (2 products)
      {
        _id: new ObjectId(),
        name: 'Modular Storage Cubes',
        description: 'Stackable storage system perfect for organizing any space',
        category: 'everyday_objects' as const,
        difficulty: 'easy' as const,
        estimatedAssemblyTime: 30,
        materialRequirements: {
          plasticType: 'HDPE' as const,
          weight: 1.4
        },
        designFiles: {
          instructionsPdf: 'storage-cube-instructions.pdf',
          templateSvg: 'cube-template.svg',
          photos: ['storage-cubes-1.jpg', 'storage-cubes-2.jpg']
        },
        assets: [
          {
            id: 'storage-main-1',
            type: 'image',
            url: '/images/products/storage-cubes-main.jpg',
            thumbnail: '/images/products/thumbs/storage-cubes-main.jpg',
            alt: 'Modular Storage Cubes stacked',
            description: 'Colorful stackable storage cube system',
            isPrimary: true,
            order: 1
          }
        ],
        price: 34.99,
        inStock: true,
        rating: 4.5,
        reviewCount: 128,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Ergonomic Phone Stand',
        description: 'Adjustable phone stand with perfect viewing angles for work and entertainment',
        category: 'everyday_objects' as const,
        difficulty: 'easy' as const,
        estimatedAssemblyTime: 20,
        materialRequirements: {
          plasticType: 'PET' as const,
          weight: 0.3
        },
        designFiles: {
          instructionsPdf: 'phone-stand-instructions.pdf',
          photos: ['phone-stand-1.jpg']
        },
        assets: [
          {
            id: 'phone-stand-main-1',
            type: 'image',
            url: '/images/products/phone-stand-main.jpg',
            thumbnail: '/images/products/thumbs/phone-stand-main.jpg',
            alt: 'Ergonomic Phone Stand with device',
            description: 'Sleek phone stand holding smartphone',
            isPrimary: true,
            order: 1
          }
        ],
        price: 15.75,
        inStock: true,
        rating: 4.8,
        reviewCount: 203,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Limited Editions (1 product)
      {
        _id: new ObjectId(),
        name: 'Ocean Waves Art Piece',
        description: 'Limited edition sculptural art piece capturing the essence of ocean movements - Only 50 made',
        category: 'limited_editions' as const,
        difficulty: 'hard' as const,
        estimatedAssemblyTime: 300,
        materialRequirements: {
          plasticType: 'PET' as const,
          weight: 3.2
        },
        designFiles: {
          instructionsPdf: 'ocean-waves-instructions.pdf',
          templateSvg: 'waves-template.svg',
          photos: ['ocean-waves-1.jpg', 'ocean-waves-2.jpg', 'ocean-waves-3.jpg']
        },
        assets: [
          {
            id: 'waves-art-main-1',
            type: 'image',
            url: '/images/products/ocean-waves-main.jpg',
            thumbnail: '/images/products/thumbs/ocean-waves-main.jpg',
            alt: 'Ocean Waves Art Piece sculpture',
            description: 'Limited edition ocean-inspired art sculpture',
            isPrimary: true,
            order: 1
          },
          {
            id: 'waves-detail-1',
            type: 'image',
            url: '/images/products/ocean-waves-detail.jpg',
            thumbnail: '/images/products/thumbs/ocean-waves-detail.jpg',
            alt: 'Close-up of wave details',
            description: 'Intricate wave pattern details',
            isPrimary: false,
            order: 2
          },
          {
            id: 'waves-process-vid',
            type: 'video',
            url: '/videos/products/waves-creation-process.mp4',
            thumbnail: '/images/products/thumbs/waves-process-thumb.jpg',
            alt: 'Art piece creation process',
            description: 'Behind-the-scenes creation video',
            isPrimary: false,
            order: 3
          }
        ],
        price: 299.99,
        inStock: true,
        rating: 5.0,
        reviewCount: 12,
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