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
    
    // Generate Products
    const products = [
      // Flora & Fauna - 2 items
      {
        _id: new ObjectId(),
        name: "Blooming Lotus Sculpture",
        description: "Intricate lotus flower sculpture that opens and closes with mechanical precision. Made from recycled ocean plastic.",
        category: "flora_fauna" as const,
        difficulty: "medium" as const,
        estimatedAssemblyTime: 90,
        materialRequirements: {
          plasticType: "PET" as const,
          weight: 1.8
        },
        designFiles: {
          photos: ["/api/placeholder/300/200"],
          instructionsPdf: "/instructions/lotus-sculpture.pdf"
        },
        assets: [
          {
            id: "lotus-main-1",
            type: "image",
            url: "/images/products/lotus-sculpture-main.jpg",
            thumbnail: "/images/products/thumbs/lotus-sculpture-main.jpg",
            alt: "Blooming Lotus Sculpture in open position",
            description: "Beautiful lotus sculpture crafted from ocean plastic",
            isPrimary: true,
            order: 1
          },
          {
            id: "lotus-mechanism-1",
            type: "image",
            url: "/images/products/lotus-mechanism.jpg",
            thumbnail: "/images/products/thumbs/lotus-mechanism.jpg",
            alt: "Lotus sculpture internal mechanism",
            description: "Precision engineering of the blooming mechanism",
            isPrimary: false,
            order: 2
          },
          {
            id: "lotus-demo-vid",
            type: "video",
            url: "/videos/products/lotus-blooming-demo.mp4",
            thumbnail: "/images/products/thumbs/lotus-demo-thumb.jpg",
            alt: "Lotus sculpture blooming demonstration",
            description: "Time-lapse of lotus opening and closing cycle",
            isPrimary: false,
            order: 3
          }
        ],
        price: 65,
        inStock: true,
        rating: 4.9,
        reviewCount: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: "Butterfly Migration Mobile",
        description: "Delicate kinetic mobile featuring butterflies that flutter with air currents. Each butterfly is unique, made from colorful recycled plastics.",
        category: "flora_fauna" as const,
        difficulty: "easy" as const,
        estimatedAssemblyTime: 45,
        materialRequirements: {
          plasticType: "PP" as const,
          weight: 0.8
        },
        designFiles: {
          photos: ["/api/placeholder/300/200"]
        },
        assets: [
          {
            id: "butterfly-main-1",
            type: "image",
            url: "/images/products/butterfly-mobile-main.jpg",
            thumbnail: "/images/products/thumbs/butterfly-mobile-main.jpg",
            alt: "Butterfly Migration Mobile suspended",
            description: "Graceful mobile with colorful recycled plastic butterflies",
            isPrimary: true,
            order: 1
          },
          {
            id: "butterfly-detail-1",
            type: "image",
            url: "/images/products/butterfly-detail.jpg",
            thumbnail: "/images/products/thumbs/butterfly-detail.jpg",
            alt: "Individual butterfly detail",
            description: "Close-up of intricate butterfly wing patterns",
            isPrimary: false,
            order: 2
          }
        ],
        price: 32,
        inStock: true,
        rating: 4.7,
        reviewCount: 23,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Kinetic Sculptures - 2 items
      {
        _id: new ObjectId(),
        name: "Wave Generator",
        description: "Mesmerizing kinetic sculpture that creates perpetual wave motions. Powered by a simple hand crank mechanism.",
        category: "kinetic_sculptures" as const,
        difficulty: "hard" as const,
        estimatedAssemblyTime: 180,
        materialRequirements: {
          plasticType: "HDPE" as const,
          weight: 3.2
        },
        designFiles: {
          photos: ["/api/placeholder/300/200"],
          instructionsPdf: "/instructions/wave-generator.pdf"
        },
        assets: [
          {
            id: "wave-main-1",
            type: "image",
            url: "/images/products/wave-generator-main.jpg",
            thumbnail: "/images/products/thumbs/wave-generator-main.jpg",
            alt: "Wave Generator kinetic sculpture",
            description: "Hypnotic wave patterns in perpetual motion",
            isPrimary: true,
            order: 1
          },
          {
            id: "wave-motion-vid",
            type: "video",
            url: "/videos/products/wave-generator-motion.mp4",
            thumbnail: "/images/products/thumbs/wave-motion-thumb.jpg",
            alt: "Wave generator in motion",
            description: "Captivating wave patterns and fluid motion demonstration",
            isPrimary: false,
            order: 2
          },
          {
            id: "wave-3d-model",
            type: "model",
            url: "/models/products/wave-generator.obj",
            thumbnail: "/images/products/thumbs/wave-3d-thumb.jpg",
            alt: "3D model of wave generator",
            description: "Interactive 3D model showing internal mechanisms",
            isPrimary: false,
            order: 3
          }
        ],
        price: 89,
        inStock: true,
        rating: 4.8,
        reviewCount: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: "Orbital Dance",
        description: "Elegant planetary motion simulator with multiple spheres orbiting in synchronized patterns. A meditation in motion.",
        category: "kinetic_sculptures" as const,
        difficulty: "medium" as const,
        estimatedAssemblyTime: 120,
        materialRequirements: {
          plasticType: "PET" as const,
          weight: 2.1
        },
        designFiles: {
          photos: ["/api/placeholder/300/200"]
        },
        assets: [
          {
            id: "orbital-main-1",
            type: "image",
            url: "/images/products/orbital-dance-main.jpg",
            thumbnail: "/images/products/thumbs/orbital-dance-main.jpg",
            alt: "Orbital Dance kinetic sculpture",
            description: "Synchronized planetary motion in recycled plastic",
            isPrimary: true,
            order: 1
          },
          {
            id: "orbital-motion-vid",
            type: "video",
            url: "/videos/products/orbital-dance-motion.mp4",
            thumbnail: "/images/products/thumbs/orbital-motion-thumb.jpg",
            alt: "Orbital dance motion demonstration",
            description: "Hypnotic synchronized orbital patterns",
            isPrimary: false,
            order: 2
          }
        ],
        price: 72,
        inStock: true,
        rating: 4.9,
        reviewCount: 19,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Vehicles & Vessels - 2 items
      {
        _id: new ObjectId(),
        name: "Wind-Powered Trimaran",
        description: "Sleek three-hull sailing vessel that actually floats and sails. Perfect for pond adventures and understanding wind dynamics.",
        category: "vehicles_vessels" as const,
        difficulty: "medium" as const,
        estimatedAssemblyTime: 75,
        materialRequirements: {
          plasticType: "HDPE" as const,
          weight: 1.4
        },
        designFiles: {
          photos: ["/api/placeholder/300/200"],
          instructionsPdf: "/instructions/trimaran-build.pdf"
        },
        assets: [
          {
            id: "trimaran-main-1",
            type: "image",
            url: "/images/products/trimaran-main.jpg",
            thumbnail: "/images/products/thumbs/trimaran-main.jpg",
            alt: "Wind-Powered Trimaran sailing vessel",
            description: "Elegant three-hull design ready for water adventures",
            isPrimary: true,
            order: 1
          },
          {
            id: "trimaran-sailing-1",
            type: "image",
            url: "/images/products/trimaran-sailing.jpg",
            thumbnail: "/images/products/thumbs/trimaran-sailing.jpg",
            alt: "Trimaran sailing on water",
            description: "Trimaran gliding across calm waters",
            isPrimary: false,
            order: 2
          },
          {
            id: "trimaran-build-vid",
            type: "video",
            url: "/videos/products/trimaran-assembly.mp4",
            thumbnail: "/images/products/thumbs/trimaran-build-thumb.jpg",
            alt: "Trimaran assembly guide",
            description: "Step-by-step sailing vessel construction",
            isPrimary: false,
            order: 3
          }
        ],
        price: 48,
        inStock: true,
        rating: 4.6,
        reviewCount: 28,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: "Lunar Rover Explorer",
        description: "Six-wheeled exploration rover inspired by space missions. Features working suspension and sample collection arm.",
        category: "vehicles_vessels" as const,
        difficulty: "hard" as const,
        estimatedAssemblyTime: 150,
        materialRequirements: {
          plasticType: "PET" as const,
          weight: 2.7
        },
        designFiles: {
          photos: ["/api/placeholder/300/200"],
          instructionsPdf: "/instructions/lunar-rover.pdf"
        },
        assets: [
          {
            id: "rover-main-1",
            type: "image",
            url: "/images/products/lunar-rover-main.jpg",
            thumbnail: "/images/products/thumbs/lunar-rover-main.jpg",
            alt: "Lunar Rover Explorer complete build",
            description: "Detailed space exploration rover with working mechanisms",
            isPrimary: true,
            order: 1
          },
          {
            id: "rover-suspension-1",
            type: "image",
            url: "/images/products/rover-suspension.jpg",
            thumbnail: "/images/products/thumbs/rover-suspension.jpg",
            alt: "Rover suspension system detail",
            description: "Advanced six-wheel suspension system",
            isPrimary: false,
            order: 2
          }
        ],
        price: 78,
        inStock: true,
        rating: 4.8,
        reviewCount: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Pop Bots - 3 items
      {
        _id: new ObjectId(),
        name: "Groove Bot",
        description: "Dancing robot that responds to sound with rhythmic movements. Colorful and expressive, perfect for interactive play.",
        category: "pop_bots" as const,
        difficulty: "medium" as const,
        estimatedAssemblyTime: 90,
        materialRequirements: {
          plasticType: "PP" as const,
          weight: 1.9
        },
        designFiles: {
          photos: ["/api/placeholder/300/200"]
        },
        assets: [
          {
            id: "groove-main-1",
            type: "image",
            url: "/images/products/groove-bot-main.jpg",
            thumbnail: "/images/products/thumbs/groove-bot-main.jpg",
            alt: "Groove Bot dancing robot",
            description: "Colorful robot with expressive dance moves",
            isPrimary: true,
            order: 1
          },
          {
            id: "groove-dance-vid",
            type: "video",
            url: "/videos/products/groove-bot-dance.mp4",
            thumbnail: "/images/products/thumbs/groove-dance-thumb.jpg",
            alt: "Groove Bot dancing demonstration",
            description: "Robot showing off its rhythmic dance moves",
            isPrimary: false,
            order: 2
          }
        ],
        price: 56,
        inStock: true,
        rating: 4.7,
        reviewCount: 32,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: "Companion Bot",
        description: "Friendly desktop companion with articulated arms and expressive LED eyes. Perfect for creative storytelling.",
        category: "pop_bots" as const,
        difficulty: "easy" as const,
        estimatedAssemblyTime: 60,
        materialRequirements: {
          plasticType: "HDPE" as const,
          weight: 1.2
        },
        designFiles: {
          photos: ["/api/placeholder/300/200"]
        },
        assets: [
          {
            id: "companion-main-1",
            type: "image",
            url: "/images/products/companion-bot-main.jpg",
            thumbnail: "/images/products/thumbs/companion-bot-main.jpg",
            alt: "Companion Bot desktop robot",
            description: "Friendly robot companion with expressive features",
            isPrimary: true,
            order: 1
          },
          {
            id: "companion-expressions-1",
            type: "image",
            url: "/images/products/companion-expressions.jpg",
            thumbnail: "/images/products/thumbs/companion-expressions.jpg",
            alt: "Companion Bot various expressions",
            description: "Different poses and LED eye expressions",
            isPrimary: false,
            order: 2
          }
        ],
        price: 42,
        inStock: true,
        rating: 4.8,
        reviewCount: 41,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: "Guardian Bot",
        description: "Protective warrior robot with shield and sword accessories. Stands tall as a desk guardian with moveable joints.",
        category: "pop_bots" as const,
        difficulty: "hard" as const,
        estimatedAssemblyTime: 135,
        materialRequirements: {
          plasticType: "PET" as const,
          weight: 2.4
        },
        designFiles: {
          photos: ["/api/placeholder/300/200"],
          instructionsPdf: "/instructions/guardian-bot.pdf"
        },
        assets: [
          {
            id: "guardian-main-1",
            type: "image",
            url: "/images/products/guardian-bot-main.jpg",
            thumbnail: "/images/products/thumbs/guardian-bot-main.jpg",
            alt: "Guardian Bot warrior robot",
            description: "Imposing warrior robot with shield and sword",
            isPrimary: true,
            order: 1
          },
          {
            id: "guardian-poses-1",
            type: "image",
            url: "/images/products/guardian-poses.jpg",
            thumbnail: "/images/products/thumbs/guardian-poses.jpg",
            alt: "Guardian Bot action poses",
            description: "Various warrior poses and battle stances",
            isPrimary: false,
            order: 2
          }
        ],
        price: 68,
        inStock: false,
        rating: 4.9,
        reviewCount: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Everyday Objects - 2 items
      {
        _id: new ObjectId(),
        name: "Modular Desk Organizer",
        description: "Customizable desk organization system with interlocking compartments. Arrange to fit your workspace perfectly.",
        category: "everyday_objects" as const,
        difficulty: "easy" as const,
        estimatedAssemblyTime: 30,
        materialRequirements: {
          plasticType: "HDPE" as const,
          weight: 1.1
        },
        designFiles: {
          photos: ["/api/placeholder/300/200"]
        },
        assets: [
          {
            id: "organizer-main-1",
            type: "image",
            url: "/images/products/desk-organizer-main.jpg",
            thumbnail: "/images/products/thumbs/desk-organizer-main.jpg",
            alt: "Modular Desk Organizer system",
            description: "Clean, customizable workspace organization",
            isPrimary: true,
            order: 1
          },
          {
            id: "organizer-configs-1",
            type: "image",
            url: "/images/products/organizer-configurations.jpg",
            thumbnail: "/images/products/thumbs/organizer-configurations.jpg",
            alt: "Various organizer configurations",
            description: "Multiple arrangement possibilities",
            isPrimary: false,
            order: 2
          }
        ],
        price: 35,
        inStock: true,
        rating: 4.6,
        reviewCount: 67,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: "Precision Pour Spout Set",
        description: "Universal pour spouts that transform any container into a precision pouring vessel. Perfect for oils, syrups, and more.",
        category: "everyday_objects" as const,
        difficulty: "easy" as const,
        estimatedAssemblyTime: 15,
        materialRequirements: {
          plasticType: "PP" as const,
          weight: 0.3
        },
        designFiles: {
          photos: ["/api/placeholder/300/200"]
        },
        assets: [
          {
            id: "spout-main-1",
            type: "image",
            url: "/images/products/pour-spout-main.jpg",
            thumbnail: "/images/products/thumbs/pour-spout-main.jpg",
            alt: "Precision Pour Spout Set",
            description: "Universal spouts for precise pouring control",
            isPrimary: true,
            order: 1
          },
          {
            id: "spout-action-1",
            type: "image",
            url: "/images/products/spout-in-action.jpg",
            thumbnail: "/images/products/thumbs/spout-in-action.jpg",
            alt: "Pour spout demonstration",
            description: "Precise pouring with zero waste",
            isPrimary: false,
            order: 2
          }
        ],
        price: 18,
        inStock: true,
        rating: 4.4,
        reviewCount: 89,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Limited Editions - 1 item
      {
        _id: new ObjectId(),
        name: "Ocean Cleanup Memorial",
        description: "Limited edition sculpture commemorating ocean cleanup efforts. Each piece contains verified ocean plastic and includes a certificate of impact.",
        category: "limited_editions" as const,
        difficulty: "medium" as const,
        estimatedAssemblyTime: 120,
        materialRequirements: {
          plasticType: "PET" as const,
          weight: 2.8
        },
        designFiles: {
          photos: ["/api/placeholder/300/200"],
          instructionsPdf: "/instructions/ocean-memorial.pdf"
        },
        assets: [
          {
            id: "memorial-main-1",
            type: "image",
            url: "/images/products/ocean-memorial-main.jpg",
            thumbnail: "/images/products/thumbs/ocean-memorial-main.jpg",
            alt: "Ocean Cleanup Memorial sculpture",
            description: "Commemorative sculpture crafted from authenticated ocean plastic",
            isPrimary: true,
            order: 1
          },
          {
            id: "memorial-certificate-1",
            type: "image",
            url: "/images/products/memorial-certificate.jpg",
            thumbnail: "/images/products/thumbs/memorial-certificate.jpg",
            alt: "Certificate of ocean plastic impact",
            description: "Authentic certificate documenting environmental impact",
            isPrimary: false,
            order: 2
          },
          {
            id: "memorial-story-vid",
            type: "video",
            url: "/videos/products/ocean-cleanup-story.mp4",
            thumbnail: "/images/products/thumbs/cleanup-story-thumb.jpg",
            alt: "Ocean cleanup story documentary",
            description: "Documentary about the ocean plastic collection process",
            isPrimary: false,
            order: 3
          }
        ],
        price: 125,
        inStock: true,
        rating: 5.0,
        reviewCount: 3,
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