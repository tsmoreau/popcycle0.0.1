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
      {
        name: "Educational Rover Chassis",
        description: "Complete rover chassis kit made from recycled HDPE plastic. Perfect for robotics education and STEM learning.",
        category: "educational_kit",
        difficulty: "medium",
        estimatedAssemblyTime: 120,
        materialRequirements: {
          plasticType: "HDPE",
          weight: 2.3
        },
        designFiles: {
          photos: ["/api/placeholder/300/200"],
          instructionsPdf: "/instructions/rover-chassis.pdf"
        },
        price: 45,
        inStock: true,
        rating: 4.8,
        reviewCount: 24,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Modular Assembly Set",
        description: "Interlocking building pieces that teach engineering principles while demonstrating circular manufacturing.",
        category: "assembly_toy",
        difficulty: "easy",
        estimatedAssemblyTime: 45,
        materialRequirements: {
          plasticType: "PET",
          weight: 1.7
        },
        designFiles: {
          photos: ["/api/placeholder/300/200"]
        },
        price: 32,
        inStock: true,
        rating: 4.6,
        reviewCount: 18,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sustainability Learning Kit",
        description: "Hands-on kit teaching circular economy principles through interactive plastic transformation activities.",
        category: "educational_kit",
        difficulty: "medium",
        estimatedAssemblyTime: 90,
        materialRequirements: {
          plasticType: "PP",
          weight: 3.1
        },
        designFiles: {
          photos: ["/api/placeholder/300/200"],
          instructionsPdf: "/instructions/sustainability-kit.pdf"
        },
        price: 38,
        inStock: true,
        rating: 4.9,
        reviewCount: 31,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Eco Dinnerware Set",
        description: "Durable dinnerware set crafted from recycled plastic. Food-safe and perfect for outdoor education programs.",
        category: "practical_item",
        difficulty: "easy",
        estimatedAssemblyTime: 30,
        materialRequirements: {
          plasticType: "HDPE",
          weight: 1.9
        },
        designFiles: {
          photos: ["/api/placeholder/300/200"]
        },
        price: 28,
        inStock: true,
        rating: 4.7,
        reviewCount: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Mini Garden Tool Set",
        description: "Child-friendly garden tools made from recycled plastic. Great for outdoor learning and environmental education.",
        category: "practical_item",
        difficulty: "easy",
        estimatedAssemblyTime: 60,
        materialRequirements: {
          plasticType: "HDPE",
          weight: 2.1
        },
        designFiles: {
          photos: ["/api/placeholder/300/200"]
        },
        price: 35,
        inStock: false,
        rating: 4.5,
        reviewCount: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Science Measurement Kit",
        description: "Precision measurement tools for science education, all crafted from traceable recycled plastic materials.",
        category: "educational_kit",
        difficulty: "hard",
        estimatedAssemblyTime: 150,
        materialRequirements: {
          plasticType: "PET",
          weight: 2.5
        },
        designFiles: {
          photos: ["/api/placeholder/300/200"],
          instructionsPdf: "/instructions/measurement-kit.pdf"
        },
        price: 42,
        inStock: true,
        rating: 4.8,
        reviewCount: 22,
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