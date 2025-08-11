import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

export async function POST() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('PopCycle');
    
    const sampleProducts = [
      // Flora & Fauna - 2 items
      {
        name: "Blooming Lotus Sculpture",
        description: "Intricate lotus flower sculpture that opens and closes with mechanical precision. Made from recycled ocean plastic.",
        category: "flora_fauna",
        difficulty: "medium",
        estimatedAssemblyTime: 90,
        materialRequirements: {
          plasticType: "PET",
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
        name: "Butterfly Migration Mobile",
        description: "Delicate kinetic mobile featuring butterflies that flutter with air currents. Each butterfly is unique, made from colorful recycled plastics.",
        category: "flora_fauna",
        difficulty: "easy",
        estimatedAssemblyTime: 45,
        materialRequirements: {
          plasticType: "PP",
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
        name: "Wave Generator",
        description: "Mesmerizing kinetic sculpture that creates perpetual wave motions. Powered by a simple hand crank mechanism.",
        category: "kinetic_sculptures",
        difficulty: "hard",
        estimatedAssemblyTime: 180,
        materialRequirements: {
          plasticType: "HDPE",
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
        name: "Orbital Dance",
        description: "Elegant planetary motion simulator with multiple spheres orbiting in synchronized patterns. A meditation in motion.",
        category: "kinetic_sculptures",
        difficulty: "medium",
        estimatedAssemblyTime: 120,
        materialRequirements: {
          plasticType: "PET",
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
        name: "Wind-Powered Trimaran",
        description: "Sleek three-hull sailing vessel that actually floats and sails. Perfect for pond adventures and understanding wind dynamics.",
        category: "vehicles_vessels",
        difficulty: "medium",
        estimatedAssemblyTime: 75,
        materialRequirements: {
          plasticType: "HDPE",
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
        name: "Lunar Rover Explorer",
        description: "Six-wheeled exploration rover inspired by space missions. Features working suspension and sample collection arm.",
        category: "vehicles_vessels",
        difficulty: "hard",
        estimatedAssemblyTime: 150,
        materialRequirements: {
          plasticType: "PET",
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
        name: "Groove Bot",
        description: "Dancing robot that responds to sound with rhythmic movements. Colorful and expressive, perfect for interactive play.",
        category: "pop_bots",
        difficulty: "medium",
        estimatedAssemblyTime: 90,
        materialRequirements: {
          plasticType: "PP",
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
        name: "Companion Bot",
        description: "Friendly desktop companion with articulated arms and expressive LED eyes. Perfect for creative storytelling.",
        category: "pop_bots",
        difficulty: "easy",
        estimatedAssemblyTime: 60,
        materialRequirements: {
          plasticType: "HDPE",
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
        name: "Guardian Bot",
        description: "Protective warrior robot with shield and sword accessories. Stands tall as a desk guardian with moveable joints.",
        category: "pop_bots",
        difficulty: "hard",
        estimatedAssemblyTime: 135,
        materialRequirements: {
          plasticType: "PET",
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
        name: "Modular Desk Organizer",
        description: "Customizable desk organization system with interlocking compartments. Arrange to fit your workspace perfectly.",
        category: "everyday_objects",
        difficulty: "easy",
        estimatedAssemblyTime: 30,
        materialRequirements: {
          plasticType: "HDPE",
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
        name: "Precision Pour Spout Set",
        description: "Universal pour spouts that transform any container into a precision pouring vessel. Perfect for oils, syrups, and more.",
        category: "everyday_objects",
        difficulty: "easy",
        estimatedAssemblyTime: 15,
        materialRequirements: {
          plasticType: "PP",
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
        name: "Ocean Cleanup Memorial",
        description: "Limited edition sculpture commemorating ocean cleanup efforts. Each piece contains verified ocean plastic and includes a certificate of impact.",
        category: "limited_editions",
        difficulty: "medium",
        estimatedAssemblyTime: 120,
        materialRequirements: {
          plasticType: "PET",
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

    const result = await db.collection('products').insertMany(sampleProducts);
    
    return NextResponse.json({ 
      message: 'Sample products created successfully',
      insertedCount: result.insertedCount,
      insertedIds: result.insertedIds
    });
  } catch (error) {
    console.error('Error creating sample products:', error);
    return NextResponse.json({ error: 'Failed to create sample products' }, { status: 500 });
  } finally {
    await client.close();
  }
}