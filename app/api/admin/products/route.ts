import { NextRequest, NextResponse } from 'next/server'
import { MongoClient, ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()
    const db = client.db('PopCycle')
    
    const products = await db.collection('products').find({}).toArray()
    
    await client.close()
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()
    const db = client.db('PopCycle')
    
    const newProduct = {
      _id: new ObjectId(),
      name: body.name,
      description: body.description,
      category: body.category,
      difficulty: body.difficulty,
      estimatedAssemblyTime: parseInt(body.estimatedAssemblyTime),
      materialRequirements: {
        plasticType: body.plasticType,
        weight: parseFloat(body.weight)
      },
      designFiles: {
        instructionsPdf: body.instructionsPdf || '',
        templateSvg: body.templateSvg || '',
        photos: body.photos || []
      },
      price: parseFloat(body.price),
      inStock: body.inStock || true,
      rating: 0,
      reviewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await db.collection('products').insertOne(newProduct)
    
    await client.close()
    
    return NextResponse.json({ 
      success: true, 
      productId: result.insertedId,
      product: newProduct
    })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()
    const db = client.db('PopCycle')
    
    const { _id, ...updateData } = body
    updateData.updatedAt = new Date()
    
    if (updateData.estimatedAssemblyTime) {
      updateData.estimatedAssemblyTime = parseInt(updateData.estimatedAssemblyTime)
    }
    if (updateData.price) {
      updateData.price = parseFloat(updateData.price)
    }
    if (updateData.materialRequirements?.weight) {
      updateData.materialRequirements.weight = parseFloat(updateData.materialRequirements.weight)
    }
    
    const result = await db.collection('products').updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    )
    
    await client.close()
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('id')
    
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID required' },
        { status: 400 }
      )
    }
    
    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()
    const db = client.db('PopCycle')
    
    const result = await db.collection('products').deleteOne({
      _id: new ObjectId(productId)
    })
    
    await client.close()
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}