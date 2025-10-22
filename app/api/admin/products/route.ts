import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import { generateSignedUrls, getPublicUrl } from '../../../../lib/gcs';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// GET - Fetch all products
export async function GET() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('PopCycle');
    
    const products = await db.collection('products').find({}).toArray();
    
    // Generate signed URLs for private files
    const productsWithUrls = await Promise.all(
      products.map(async (product) => {
        const privateFiles: string[] = [];
        
        // Collect all private file paths
        if (product.designFiles?.cncVectors) {
          privateFiles.push(...product.designFiles.cncVectors);
        }
        if (product.designFiles?.laserVectors) {
          privateFiles.push(...product.designFiles.laserVectors);
        }
        if (product.designFiles?.instructionsPdfs) {
          privateFiles.push(...product.designFiles.instructionsPdfs);
        }
        
        // Generate signed URLs for private files (1 hour expiration)
        let signedUrls: Record<string, string> = {};
        if (privateFiles.length > 0) {
          try {
            signedUrls = await generateSignedUrls(privateFiles, 60);
          } catch (error) {
            console.error('Error generating signed URLs:', error);
          }
        }
        
        // Convert photo paths to public URLs
        const photos = product.designFiles?.photos || [];
        const photoUrls = photos.map((path: string) => getPublicUrl(path));
        
        return {
          ...product,
          _signedUrls: signedUrls, // Add signed URLs as separate field
          _photoUrls: photoUrls // Add public photo URLs
        };
      })
    );
    
    return NextResponse.json(productsWithUrls);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  } finally {
    await client.close();
  }
}

// PUT - Update a product
export async function PUT(request: Request) {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('PopCycle');
    
    const body = await request.json();
    const { _id, _signedUrls, _photoUrls, ...updateData } = body;
    
    // Convert string booleans to actual booleans
    if (typeof updateData.inStock === 'string') {
      updateData.inStock = updateData.inStock === 'true';
    }
    
    // Ensure numeric fields are numbers
    if (updateData.price) updateData.price = Number(updateData.price);
    if (updateData.estimatedAssemblyTime) updateData.estimatedAssemblyTime = Number(updateData.estimatedAssemblyTime);
    if (updateData.rating) updateData.rating = Number(updateData.rating);
    if (updateData.reviewCount) updateData.reviewCount = Number(updateData.reviewCount);
    
    // Handle nested material requirements
    if (updateData.materialRequirements?.weight) {
      updateData.materialRequirements.weight = Number(updateData.materialRequirements.weight);
    }
    
    // Clean assets array - remove filePath (internal field) and ensure proper types
    if (updateData.assets && Array.isArray(updateData.assets)) {
      updateData.assets = updateData.assets.map((asset: any) => {
        const { filePath, ...cleanAsset } = asset;
        return {
          ...cleanAsset,
          isPrimary: Boolean(cleanAsset.isPrimary),
          order: Number(cleanAsset.order) || 0
        };
      });
    }
    
    updateData.updatedAt = new Date();
    
    const result = await db.collection('products').updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  } finally {
    await client.close();
  }
}

// DELETE - Delete a product
export async function DELETE(request: Request) {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('PopCycle');
    
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }
    
    const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function POST(request: Request) {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('PopCycle');
    
    const body = await request.json();
    
    // Remove _id if present (let MongoDB generate it)
    const { _id, ...insertData } = body;
    
    // Convert string booleans to actual booleans
    if (typeof insertData.inStock === 'string') {
      insertData.inStock = insertData.inStock === 'true';
    }
    
    // Ensure numeric fields are numbers
    if (insertData.price) insertData.price = Number(insertData.price);
    if (insertData.estimatedAssemblyTime) insertData.estimatedAssemblyTime = Number(insertData.estimatedAssemblyTime);
    if (insertData.rating) insertData.rating = Number(insertData.rating);
    if (insertData.reviewCount) insertData.reviewCount = Number(insertData.reviewCount);
    
    // Handle nested material requirements
    if (insertData.materialRequirements?.weight) {
      insertData.materialRequirements.weight = Number(insertData.materialRequirements.weight);
    }
    
    // Add timestamps
    insertData.createdAt = new Date();
    insertData.updatedAt = new Date();
    
    const result = await db.collection('products').insertOne(insertData);
    
    return NextResponse.json({ 
      message: 'Product created successfully',
      productId: result.insertedId 
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  } finally {
    await client.close();
  }
}

// Seed sample products (kept for reference)
export async function SEED_SAMPLE_PRODUCTS() {
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
        assets: [
          {
            id: "rover-main-1",
            type: "image",
            url: "/images/products/rover-chassis-main.jpg",
            thumbnail: "/images/products/thumbs/rover-chassis-main.jpg",
            alt: "Educational Rover Chassis main product view",
            description: "Main product image showing assembled rover chassis",
            isPrimary: true,
            order: 1
          },
          {
            id: "rover-parts-1",
            type: "image", 
            url: "/images/products/rover-chassis-parts.jpg",
            thumbnail: "/images/products/thumbs/rover-chassis-parts.jpg",
            alt: "Rover chassis component parts",
            description: "Individual components before assembly",
            isPrimary: false,
            order: 2
          },
          {
            id: "rover-assembly-vid",
            type: "video",
            url: "/videos/products/rover-assembly-guide.mp4",
            thumbnail: "/images/products/thumbs/rover-assembly-thumb.jpg",
            alt: "Rover chassis assembly demonstration",
            description: "Step-by-step assembly video guide",
            isPrimary: false,
            order: 3
          }
        ],
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
        assets: [
          {
            id: "modular-main-1",
            type: "image",
            url: "/images/products/modular-set-main.jpg",
            thumbnail: "/images/products/thumbs/modular-set-main.jpg",
            alt: "Modular Assembly Set complete view",
            description: "Complete modular building set with interlocking pieces",
            isPrimary: true,
            order: 1
          },
          {
            id: "modular-pieces-1",
            type: "image",
            url: "/images/products/modular-set-pieces.jpg",
            thumbnail: "/images/products/thumbs/modular-set-pieces.jpg",
            alt: "Individual modular pieces",
            description: "Various interlocking building pieces",
            isPrimary: false,
            order: 2
          }
        ],
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
        assets: [
          {
            id: "sustain-main-1",
            type: "image",
            url: "/images/products/sustainability-kit-main.jpg",
            thumbnail: "/images/products/thumbs/sustainability-kit-main.jpg",
            alt: "Sustainability Learning Kit overview",
            description: "Complete sustainability education kit with activities",
            isPrimary: true,
            order: 1
          },
          {
            id: "sustain-activity-1",
            type: "image",
            url: "/images/products/sustainability-activity.jpg",
            thumbnail: "/images/products/thumbs/sustainability-activity.jpg",
            alt: "Sustainability kit activity demonstration",
            description: "Students engaged in circular economy activity",
            isPrimary: false,
            order: 2
          },
          {
            id: "sustain-guide-pdf",
            type: "document",
            url: "/documents/sustainability-guide.pdf",
            thumbnail: "/images/products/thumbs/sustainability-guide.jpg",
            alt: "Sustainability guide document",
            description: "Comprehensive educator's guide PDF",
            isPrimary: false,
            order: 3
          }
        ],
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
        assets: [
          {
            id: "dinnerware-main-1",
            type: "image",
            url: "/images/products/eco-dinnerware-main.jpg",
            thumbnail: "/images/products/thumbs/eco-dinnerware-main.jpg",
            alt: "Eco Dinnerware Set complete",
            description: "Complete eco-friendly dinnerware set",
            isPrimary: true,
            order: 1
          },
          {
            id: "dinnerware-use-1",
            type: "image",
            url: "/images/products/eco-dinnerware-use.jpg",
            thumbnail: "/images/products/thumbs/eco-dinnerware-use.jpg",
            alt: "Dinnerware set in use outdoors",
            description: "Students using dinnerware set during outdoor program",
            isPrimary: false,
            order: 2
          }
        ],
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
        assets: [
          {
            id: "garden-tools-main-1",
            type: "image",
            url: "/images/products/garden-tools-main.jpg",
            thumbnail: "/images/products/thumbs/garden-tools-main.jpg",
            alt: "Mini Garden Tool Set overview",
            description: "Complete set of child-friendly garden tools",
            isPrimary: true,
            order: 1
          },
          {
            id: "garden-tools-action-1",
            type: "image",
            url: "/images/products/garden-tools-action.jpg",
            thumbnail: "/images/products/thumbs/garden-tools-action.jpg",
            alt: "Children using garden tools",
            description: "Kids learning gardening with eco-friendly tools",
            isPrimary: false,
            order: 2
          }
        ],
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
        assets: [
          {
            id: "science-kit-main-1",
            type: "image",
            url: "/images/products/science-measurement-main.jpg",
            thumbnail: "/images/products/thumbs/science-measurement-main.jpg",
            alt: "Science Measurement Kit complete set",
            description: "Complete precision measurement toolkit for education",
            isPrimary: true,
            order: 1
          },
          {
            id: "science-kit-tools-1",
            type: "image",
            url: "/images/products/science-measurement-tools.jpg",
            thumbnail: "/images/products/thumbs/science-measurement-tools.jpg",
            alt: "Individual measurement tools",
            description: "Detailed view of precision measurement instruments",
            isPrimary: false,
            order: 2
          },
          {
            id: "science-kit-demo-vid",
            type: "video",
            url: "/videos/products/measurement-kit-demo.mp4",
            thumbnail: "/images/products/thumbs/measurement-demo-thumb.jpg",
            alt: "Measurement kit demonstration",
            description: "Educational demonstration of precision measurement techniques",
            isPrimary: false,
            order: 3
          },
          {
            id: "science-kit-3d-model",
            type: "model",
            url: "/models/products/measurement-kit.obj",
            thumbnail: "/images/products/thumbs/measurement-3d-thumb.jpg",
            alt: "3D model of measurement kit",
            description: "Interactive 3D model for educational visualization",
            isPrimary: false,
            order: 4
          }
        ],
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