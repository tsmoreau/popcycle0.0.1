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
    const collections = ['orgs', 'bins', 'batches', 'blanks', 'users', 'products', 'orders', 'events'];
    for (const collName of collections) {
      await db.collection(collName).deleteMany({});
    }
    
    // Generate Events first (top-level collection in v3)
    const events = [
      {
        _id: new ObjectId(),
        orgId: new ObjectId(), // Will be updated with actual org IDs below
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
        orgId: new ObjectId(), // Will be updated below
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
      },
      {
        _id: new ObjectId(),
        orgId: new ObjectId(), // Will be updated below
        eventId: 'sustainability-week-2025',
        name: 'Sustainability Week 2025',
        type: 'ad_hoc' as const,
        description: 'Week-long sustainability initiative for hotel guests',
        scheduledDate: new Date('2025-04-01'),
        location: 'Hotel Lobby & Restaurant',
        binIds: [],
        status: 'planned' as const,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Generate Organizations (Partners) - v3 schema
    const orgs = [
      {
        _id: new ObjectId(),
        name: 'PopCycle',
        slug: 'popcycle',
        orgType: 'retailer' as const,
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
        retailer: {
          buyerContactName: 'Jordan Lee',
          buyerContactEmail: 'jordan@popcycle.org',
          buyerContactPhone: '(555) 100-0001',
          accountsPayableEmail: 'ap@popcycle.org',
          paymentTerms: 'Net 30',
          exclusivityType: 'none' as const
        },
        eventIds: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Discovery Cube',
        slug: 'discoverycube',
        orgType: 'community_partner' as const,
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
        communityPartner: {
          mission: 'Inspire and educate young minds through interactive science exhibits',
          storyContent: 'Discovery Cube has been a leader in STEM education for over 30 years, serving hundreds of thousands of students annually.',
          communityPartnerType: 'nonprofit',
          socialMedia: {
            instagram: '@discoverycube',
            facebook: 'discoverycube',
            twitter: '@discoverycube'
          },
          directorName: 'Dr. Jennifer Williams',
          directorTitle: 'Executive Director',
          directorBio: 'Leading STEM education advocate with 15 years of museum experience',
          pickupSchedule: 'Bi-weekly on Wednesdays',
          accessRequirements: 'Loading dock access, advance notice required',
          metrics: {
            totalWeightCollected: 245.8,
            averageWeightPerPickup: 18.5,
            contaminationRate: 0.05,
            pickupCount: 13,
            lastPickupDate: new Date('2025-02-10')
          }
        },
        eventIds: ['summer-camp-2025'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'LA Plaza de Cultura y Artes',
        slug: 'laplaza',
        orgType: 'community_partner' as const,
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
        communityPartner: {
          mission: 'Preserve and celebrate the history and culture of Mexicans and Mexican Americans',
          storyContent: 'LA Plaza serves as a cultural hub bringing together art, history, and community in downtown Los Angeles.',
          communityPartnerType: 'nonprofit',
          socialMedia: {
            instagram: '@laplazaLA',
            facebook: 'laplazaLA'
          },
          directorName: 'Maria Hernandez',
          directorTitle: 'Cultural Director',
          directorBio: 'Passionate advocate for cultural preservation and community engagement',
          pickupSchedule: 'Monthly on the first Monday',
          accessRequirements: 'Street-level pickup, coordinate with events calendar',
          metrics: {
            totalWeightCollected: 128.3,
            averageWeightPerPickup: 16.0,
            contaminationRate: 0.03,
            pickupCount: 8,
            lastPickupDate: new Date('2025-02-01')
          }
        },
        eventIds: ['cultural-workshop-2025'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Ace Hotel Downtown LA',
        slug: 'acehotel',
        orgType: 'venue' as const,
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
        venue: {
          partnershipTier: 'integrated' as const,
          retainerAmount: 2500,
          contractStartDate: new Date('2024-01-01'),
          contractEndDate: new Date('2026-12-31'),
          integrateOwnWaste: true,
          monthlyDeliveryCap: 50,
          productPreferences: {
            exclusionList: ['pop_bots']
          }
        },
        eventIds: ['sustainability-week-2025'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Update event orgIds with actual org IDs
    events[0].orgId = orgs[1]._id; // Discovery Cube
    events[1].orgId = orgs[2]._id; // LA Plaza
    events[2].orgId = orgs[3]._id; // Ace Hotel
    
    await db.collection('orgs').insertMany(orgs);
    await db.collection('events').insertMany(events);
    
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
        
        // Assign some bins to events defined for the org (30% chance)
        let eventId: string | undefined = undefined;
        if (org.eventIds && org.eventIds.length > 0 && Math.random() > 0.7) {
          eventId = org.eventIds[Math.floor(Math.random() * org.eventIds.length)];
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
    
    // Generate Products with v3 schema
    const products = [
      // Workshop products - hands-on educational items (5 products)
      {
        _id: new ObjectId(),
        name: 'DIY Coaster Set Workshop Kit',
        description: 'Make your own set of 4 colorful recycled plastic coasters in our workshop',
        category: 'workshop' as const,
        productType: 'coasters' as const,
        designFiles: {
          cncVectors: ['coaster-cnc-v1.svg', 'coaster-cnc-v2.svg'],
          laserVectors: ['coaster-laser-patterns.svg'],
          instructionsPdfs: ['coaster-workshop-guide.pdf', 'coaster-safety.pdf'],
          photos: ['coaster-1.jpg', 'coaster-2.jpg']
        },
        assets: [
          {
            id: 'coaster-main-1',
            type: 'image' as const,
            url: '/images/products/coasters-main.jpg',
            thumbnail: '/images/products/thumbs/coasters-main.jpg',
            alt: 'Colorful recycled plastic coasters',
            description: 'Set of 4 handmade coasters in workshop',
            isPrimary: true,
            order: 1
          },
          {
            id: 'coaster-detail-1',
            type: 'image' as const,
            url: '/images/products/coasters-detail.jpg',
            thumbnail: '/images/products/thumbs/coasters-detail.jpg',
            alt: 'Close-up of coaster texture',
            description: 'Detailed view of recycled plastic texture',
            isPrimary: false,
            order: 2
          }
        ],
        price: 15.99,
        inStock: true,
        rating: 4.8,
        reviewCount: 142,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Keychain Making Workshop',
        description: 'Design and create custom keychains from recycled plastic in a fun hands-on session',
        category: 'workshop' as const,
        productType: 'keychains' as const,
        designFiles: {
          laserVectors: ['keychain-templates.svg'],
          instructionsPdfs: ['keychain-workshop.pdf'],
          photos: ['keychain-1.jpg', 'keychain-2.jpg', 'keychain-3.jpg']
        },
        assets: [
          {
            id: 'keychain-main-1',
            type: 'image' as const,
            url: '/images/products/keychain-main.jpg',
            thumbnail: '/images/products/thumbs/keychain-main.jpg',
            alt: 'Assorted recycled plastic keychains',
            description: 'Various keychain designs and colors',
            isPrimary: true,
            order: 1
          }
        ],
        price: 8.50,
        inStock: true,
        rating: 4.6,
        reviewCount: 87,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Bookmark Workshop Kit',
        description: 'Create unique bookmarks with custom designs in our workshop',
        category: 'workshop' as const,
        productType: 'bookmarks' as const,
        designFiles: {
          laserVectors: ['bookmark-designs.svg'],
          instructionsPdfs: ['bookmark-workshop.pdf'],
          photos: ['bookmark-1.jpg', 'bookmark-2.jpg']
        },
        assets: [
          {
            id: 'bookmark-main-1',
            type: 'image' as const,
            url: '/images/products/bookmarks-main.jpg',
            thumbnail: '/images/products/thumbs/bookmarks-main.jpg',
            alt: 'Colorful recycled plastic bookmarks',
            description: 'Variety of bookmark designs',
            isPrimary: true,
            order: 1
          }
        ],
        price: 6.99,
        inStock: true,
        rating: 4.7,
        reviewCount: 65,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Magnet Making Workshop',
        description: 'Hands-on workshop to create fun fridge magnets from recycled plastic',
        category: 'workshop' as const,
        productType: 'magnets' as const,
        designFiles: {
          cncVectors: ['magnet-shapes.svg'],
          laserVectors: ['magnet-details.svg'],
          instructionsPdfs: ['magnet-workshop.pdf'],
          photos: ['magnet-1.jpg']
        },
        assets: [
          {
            id: 'magnet-main-1',
            type: 'image' as const,
            url: '/images/products/magnets-main.jpg',
            thumbnail: '/images/products/thumbs/magnets-main.jpg',
            alt: 'Colorful recycled plastic magnets',
            description: 'Various magnet shapes and designs',
            isPrimary: true,
            order: 1
          }
        ],
        price: 9.99,
        inStock: true,
        rating: 4.5,
        reviewCount: 54,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Earring Workshop Kit',
        description: 'Design and assemble your own lightweight earrings from recycled plastic',
        category: 'workshop' as const,
        productType: 'earrings' as const,
        designFiles: {
          laserVectors: ['earring-templates.svg'],
          instructionsPdfs: ['earring-workshop.pdf', 'safety-guidelines.pdf'],
          photos: ['earring-1.jpg', 'earring-2.jpg', 'earring-3.jpg']
        },
        assets: [
          {
            id: 'earring-main-1',
            type: 'image' as const,
            url: '/images/products/earrings-main.jpg',
            thumbnail: '/images/products/thumbs/earrings-main.jpg',
            alt: 'Recycled plastic earrings display',
            description: 'Assorted earring designs',
            isPrimary: true,
            order: 1
          },
          {
            id: 'earring-vid-1',
            type: 'video' as const,
            url: '/videos/products/earring-making.mp4',
            thumbnail: '/images/products/thumbs/earring-thumb.jpg',
            alt: 'Earring making demonstration',
            description: 'Workshop tutorial video',
            isPrimary: false,
            order: 2
          }
        ],
        price: 12.50,
        inStock: true,
        rating: 4.9,
        reviewCount: 78,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Studio Edition products - limited production runs (4 products)
      {
        _id: new ObjectId(),
        name: 'Artisan Coaster Collection',
        description: 'Hand-finished coaster set with unique patterns - Studio Edition',
        category: 'studio_edition' as const,
        productType: 'coasters' as const,
        designFiles: {
          cncVectors: ['artisan-coaster-v1.svg', 'artisan-coaster-v2.svg'],
          laserVectors: ['artisan-patterns.svg'],
          instructionsPdfs: ['artisan-finishing-guide.pdf'],
          photos: ['artisan-coaster-1.jpg', 'artisan-coaster-2.jpg']
        },
        assets: [
          {
            id: 'artisan-coaster-main',
            type: 'image' as const,
            url: '/images/products/artisan-coaster-main.jpg',
            thumbnail: '/images/products/thumbs/artisan-coaster-main.jpg',
            alt: 'Artisan coaster collection',
            description: 'Premium hand-finished coasters',
            isPrimary: true,
            order: 1
          }
        ],
        price: 45.00,
        inStock: true,
        rating: 4.8,
        reviewCount: 34,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Designer Lighting Fixture',
        description: 'Contemporary pendant light - Limited studio production',
        category: 'studio_edition' as const,
        productType: 'lighting' as const,
        designFiles: {
          cncVectors: ['lighting-base.svg', 'lighting-shade.svg'],
          instructionsPdfs: ['lighting-assembly.pdf', 'electrical-safety.pdf'],
          photos: ['lighting-1.jpg', 'lighting-2.jpg', 'lighting-3.jpg']
        },
        assets: [
          {
            id: 'lighting-main-1',
            type: 'image' as const,
            url: '/images/products/lighting-main.jpg',
            thumbnail: '/images/products/thumbs/lighting-main.jpg',
            alt: 'Designer lighting fixture',
            description: 'Contemporary recycled plastic pendant light',
            isPrimary: true,
            order: 1
          },
          {
            id: 'lighting-detail',
            type: 'image' as const,
            url: '/images/products/lighting-detail.jpg',
            thumbnail: '/images/products/thumbs/lighting-detail.jpg',
            alt: 'Lighting detail view',
            description: 'Close-up of light diffusion pattern',
            isPrimary: false,
            order: 2
          }
        ],
        price: 135.00,
        inStock: true,
        rating: 4.9,
        reviewCount: 22,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Artisan Cutting Board',
        description: 'Premium cutting board with unique patterns - Studio Edition',
        category: 'studio_edition' as const,
        productType: 'cutting_boards' as const,
        designFiles: {
          cncVectors: ['cutting-board-shape.svg'],
          instructionsPdfs: ['food-safe-finishing.pdf'],
          photos: ['cutting-board-1.jpg', 'cutting-board-2.jpg']
        },
        assets: [
          {
            id: 'cutting-board-main',
            type: 'image' as const,
            url: '/images/products/cutting-board-main.jpg',
            thumbnail: '/images/products/thumbs/cutting-board-main.jpg',
            alt: 'Artisan cutting board',
            description: 'Premium recycled plastic cutting board',
            isPrimary: true,
            order: 1
          }
        ],
        price: 75.00,
        inStock: false,
        rating: 5.0,
        reviewCount: 18,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Statement Earring Collection',
        description: 'Bold geometric earrings - Limited studio run',
        category: 'studio_edition' as const,
        productType: 'earrings' as const,
        designFiles: {
          laserVectors: ['statement-earring-designs.svg'],
          instructionsPdfs: ['premium-finishing.pdf'],
          photos: ['statement-earring-1.jpg', 'statement-earring-2.jpg']
        },
        assets: [
          {
            id: 'statement-earring-main',
            type: 'image' as const,
            url: '/images/products/statement-earring-main.jpg',
            thumbnail: '/images/products/thumbs/statement-earring-main.jpg',
            alt: 'Statement earring collection',
            description: 'Bold geometric earring designs',
            isPrimary: true,
            order: 1
          }
        ],
        price: 38.00,
        inStock: true,
        rating: 4.7,
        reviewCount: 41,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Client Edition products - custom branded items (4 products)
      {
        _id: new ObjectId(),
        name: 'Custom Branded Coasters',
        description: 'Personalized coasters with custom branding for venues and retailers',
        category: 'client_edition' as const,
        productType: 'coasters' as const,
        designFiles: {
          cncVectors: ['branded-coaster-template.svg'],
          laserVectors: ['logo-placeholder.svg'],
          instructionsPdfs: ['custom-branding-specs.pdf'],
          photos: ['branded-coaster-1.jpg', 'branded-coaster-2.jpg']
        },
        assets: [
          {
            id: 'branded-coaster-main',
            type: 'image' as const,
            url: '/images/products/branded-coaster-main.jpg',
            thumbnail: '/images/products/thumbs/branded-coaster-main.jpg',
            alt: 'Custom branded coasters',
            description: 'Coasters with venue branding',
            isPrimary: true,
            order: 1
          }
        ],
        price: 24.00,
        inStock: true,
        rating: 4.6,
        reviewCount: 56,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Venue Keychains',
        description: 'Custom keychains for gift shops and merchandising',
        category: 'client_edition' as const,
        productType: 'keychains' as const,
        designFiles: {
          laserVectors: ['venue-keychain-template.svg'],
          instructionsPdfs: ['merchandising-guide.pdf'],
          photos: ['venue-keychain-1.jpg']
        },
        assets: [
          {
            id: 'venue-keychain-main',
            type: 'image' as const,
            url: '/images/products/venue-keychain-main.jpg',
            thumbnail: '/images/products/thumbs/venue-keychain-main.jpg',
            alt: 'Custom venue keychains',
            description: 'Branded keychains for retail',
            isPrimary: true,
            order: 1
          }
        ],
        price: 11.00,
        inStock: true,
        rating: 4.4,
        reviewCount: 92,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Retail Lighting Solutions',
        description: 'Custom lighting fixtures for retail spaces and venues',
        category: 'client_edition' as const,
        productType: 'lighting' as const,
        designFiles: {
          cncVectors: ['retail-lighting-v1.svg', 'retail-lighting-v2.svg'],
          instructionsPdfs: ['retail-installation.pdf', 'electrical-specs.pdf'],
          photos: ['retail-lighting-1.jpg', 'retail-lighting-2.jpg']
        },
        assets: [
          {
            id: 'retail-lighting-main',
            type: 'image' as const,
            url: '/images/products/retail-lighting-main.jpg',
            thumbnail: '/images/products/thumbs/retail-lighting-main.jpg',
            alt: 'Retail lighting fixtures',
            description: 'Custom lighting for commercial spaces',
            isPrimary: true,
            order: 1
          },
          {
            id: 'retail-lighting-installed',
            type: 'image' as const,
            url: '/images/products/retail-lighting-installed.jpg',
            thumbnail: '/images/products/thumbs/retail-lighting-installed.jpg',
            alt: 'Installed retail lighting',
            description: 'Lighting installation in venue',
            isPrimary: false,
            order: 2
          }
        ],
        price: 185.00,
        inStock: true,
        rating: 4.8,
        reviewCount: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Professional Cutting Boards',
        description: 'Custom branded cutting boards for restaurant merchandising',
        category: 'client_edition' as const,
        productType: 'cutting_boards' as const,
        designFiles: {
          cncVectors: ['professional-board.svg'],
          laserVectors: ['restaurant-branding.svg'],
          instructionsPdfs: ['commercial-specs.pdf'],
          photos: ['pro-board-1.jpg', 'pro-board-2.jpg']
        },
        assets: [
          {
            id: 'pro-board-main',
            type: 'image' as const,
            url: '/images/products/pro-board-main.jpg',
            thumbnail: '/images/products/thumbs/pro-board-main.jpg',
            alt: 'Professional cutting boards',
            description: 'Custom branded boards for restaurants',
            isPrimary: true,
            order: 1
          }
        ],
        price: 95.00,
        inStock: true,
        rating: 4.7,
        reviewCount: 28,
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
        
        // Logical progression: blank -> assembled -> delivered
        const hasAssembly = Math.random() > 0.4; // 60% chance of being assembled
        const hasDelivery = hasAssembly && Math.random() > 0.5; // 50% of assembled items get delivered
        
        let status: 'blank' | 'assembled' | 'delivered' = 'blank';
        
        if (hasDelivery) {
          status = 'delivered';
        } else if (hasAssembly) {
          status = 'assembled';
        }
        
        blanks.push({
          _id: qrCode,
          batchIds: [batch._id], // v3 schema uses array
          productId: hasAssembly ? products[Math.floor(Math.random() * products.length)]._id : undefined,
          orderId: hasDelivery ? orders[Math.floor(Math.random() * orders.length)]._id : undefined,
          userId: hasAssembly ? users[Math.floor(Math.random() * users.length)]._id : undefined,
          status: status,
          weight: Math.round((Math.random() * 0.5 + 0.2) * 100) / 100,
          materialDescription: `Recycled ${batch.materialType} plastic sheet`,
          dimensions: {
            width: Math.round((Math.random() * 5 + 10) * 10) / 10,
            height: Math.round((Math.random() * 5 + 10) * 10) / 10,
            thickness: Math.round((Math.random() * 0.5 + 0.3) * 10) / 10
          },
          assemblyDate: hasAssembly ? new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000) : undefined,
          deliveryDate: hasDelivery ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : undefined,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });
    
    await db.collection('blanks').insertMany(blanks);
    
    await client.close();
    
    // Sample QR codes for demonstration
    const sampleQRCodes = {
      bins: bins.slice(0, 3).map(b => ({ id: b._id, name: b.name })),
      batches: batches.slice(0, 3).map(b => ({ id: b._id, binIds: b.binIds })),
      blanks: blanks.slice(0, 3).map(b => ({ id: b._id, batchIds: b.batchIds }))
    };
    
    return NextResponse.json({
      success: true,
      message: 'Sample data generated successfully',
      summary: {
        organizations: orgs.length,
        events: events.length,
        bins: bins.length,
        batches: batches.length,
        blanks: blanks.length,
        items: blanks.length,
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