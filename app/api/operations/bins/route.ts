import { NextRequest, NextResponse } from 'next/server'
import { MongoClient, ObjectId } from 'mongodb'
import { Bin } from '../../../../lib/schemas'

const uri = process.env.MONGODB_URI!
const client = new MongoClient(uri)

export async function GET() {
  try {
    await client.connect()
    const db = client.db('PopCycle')
    const bins = await db.collection<Bin>('bins').find({}).toArray()
    
    return NextResponse.json(bins)
  } catch (error) {
    console.error('Error fetching bins:', error)
    return NextResponse.json({ error: 'Failed to fetch bins' }, { status: 500 })
  } finally {
    await client.close()
  }
}

export async function PUT(request: NextRequest) {
  try {
    const bin: Bin = await request.json()
    
    await client.connect()
    const db = client.db('PopCycle')
    
    const { _id, ...updateData } = bin
    updateData.updatedAt = new Date()
    
    const result = await db.collection<Bin>('bins').updateOne(
      { _id },
      { $set: updateData }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Bin not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating bin:', error)
    return NextResponse.json({ error: 'Failed to update bin' }, { status: 500 })
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
    
    const result = await db.collection<Bin>('bins').deleteOne({ _id: id })
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Bin not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting bin:', error)
    return NextResponse.json({ error: 'Failed to delete bin' }, { status: 500 })
  } finally {
    await client.close()
  }
}