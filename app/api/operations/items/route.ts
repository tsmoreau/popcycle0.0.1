import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDatabase } from '../../../../lib/mongodb'
import { Item } from '../../../../lib/schemas-v3'

export async function GET() {
  try {
    const db = await getDatabase()
    const items = await db.collection<Item>('items').find({}).toArray()
    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching items:', error)
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const item: Item = await request.json()
    const db = await getDatabase()
    
    // Generate proper _id if not provided or empty
    const _id = item._id && item._id.trim() !== '' ? item._id : `I${Math.random().toString(36).substring(2, 9).toUpperCase()}`
    
    const newItem = {
      ...item,
      _id,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    await db.collection<Item>('items').insertOne(newItem as any)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error adding item:', error)
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const item: Item = await request.json()
    const db = await getDatabase()
    
    const { _id, ...updateData } = item
    updateData.updatedAt = new Date()
    
    const result = await db.collection<Item>('items').updateOne(
      { _id },
      { $set: updateData }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating item:', error)
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID parameter required' }, { status: 400 })
    }
    
    const db = await getDatabase()
    
    const result = await db.collection<Item>('items').deleteOne({ _id: id })
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting item:', error)
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 })
  }
}
