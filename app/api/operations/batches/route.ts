import { NextRequest, NextResponse } from 'next/server'
import { MongoClient, ObjectId } from 'mongodb'
import { Batch } from '../../../../lib/schemas'

const uri = process.env.MONGODB_URI!
const client = new MongoClient(uri)

export async function GET() {
  try {
    await client.connect()
    const db = client.db('PopCycle')
    const batches = await db.collection<Batch>('batches').find({}).toArray()
    
    return NextResponse.json(batches)
  } catch (error) {
    console.error('Error fetching batches:', error)
    return NextResponse.json({ error: 'Failed to fetch batches' }, { status: 500 })
  } finally {
    await client.close()
  }
}

export async function PUT(request: NextRequest) {
  try {
    const batch: Batch = await request.json()
    
    await client.connect()
    const db = client.db('PopCycle')
    
    const { _id, ...updateData } = batch
    updateData.updatedAt = new Date()
    
    const result = await db.collection<Batch>('batches').updateOne(
      { _id },
      { $set: updateData }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Batch not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating batch:', error)
    return NextResponse.json({ error: 'Failed to update batch' }, { status: 500 })
  } finally {
    await client.close()
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID parameter required' }, { status: 400 })
    }
    
    await client.connect()
    const db = client.db('PopCycle')
    
    const result = await db.collection<Batch>('batches').deleteOne({ _id: id })
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Batch not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting batch:', error)
    return NextResponse.json({ error: 'Failed to delete batch' }, { status: 500 })
  } finally {
    await client.close()
  }
}