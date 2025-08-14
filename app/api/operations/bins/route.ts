import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDatabase } from '../../../../lib/mongodb'
import { Bin } from '../../../../lib/schemas'

export async function GET() {
  try {
    const db = await getDatabase()
    const bins = await db.collection<Bin>('bins').find({}).toArray()
    return NextResponse.json(bins)
  } catch (error) {
    console.error('Error fetching bins:', error)
    return NextResponse.json({ error: 'Failed to fetch bins' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const bin: Bin = await request.json()
    const db = await getDatabase()
    
    const { _id, ...updateData } = bin
    updateData.updatedAt = new Date()
    
    // Convert _id to ObjectId if it's a string, or use the string as-is if it's the PopCycle ID
    let query: any
    if (typeof _id === 'string' && _id.length === 24 && /^[0-9a-fA-F]{24}$/.test(_id)) {
      // If it looks like a MongoDB ObjectId, convert it
      query = { _id: new ObjectId(_id) }
    } else {
      // Otherwise, assume it's the PopCycle ID field
      query = { _id }
    }
    
    const result = await db.collection<Bin>('bins').updateOne(
      query,
      { $set: updateData }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Bin not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating bin:', error)
    return NextResponse.json({ error: 'Failed to update bin' }, { status: 500 })
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
    const result = await db.collection<Bin>('bins').deleteOne({ _id: id })
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Bin not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting bin:', error)
    return NextResponse.json({ error: 'Failed to delete bin' }, { status: 500 })
  }
}