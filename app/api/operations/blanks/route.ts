import { NextRequest, NextResponse } from 'next/server'
import { MongoClient, ObjectId } from 'mongodb'
import { Blank } from '../../../../lib/schemas'

const uri = process.env.DATABASE_URL!
const client = new MongoClient(uri)

export async function GET() {
  try {
    await client.connect()
    const db = client.db('PopCycle')
    const blanks = await db.collection<Blank>('blanks').find({}).toArray()
    
    return NextResponse.json(blanks)
  } catch (error) {
    console.error('Error fetching blanks:', error)
    return NextResponse.json({ error: 'Failed to fetch blanks' }, { status: 500 })
  } finally {
    await client.close()
  }
}

export async function PUT(request: NextRequest) {
  try {
    const blank: Blank = await request.json()
    
    await client.connect()
    const db = client.db('PopCycle')
    
    const { _id, ...updateData } = blank
    updateData.updatedAt = new Date()
    
    const result = await db.collection<Blank>('blanks').updateOne(
      { _id },
      { $set: updateData }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Blank not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating blank:', error)
    return NextResponse.json({ error: 'Failed to update blank' }, { status: 500 })
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
    
    const result = await db.collection<Blank>('blanks').deleteOne({ _id: id })
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Blank not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting blank:', error)
    return NextResponse.json({ error: 'Failed to delete blank' }, { status: 500 })
  } finally {
    await client.close()
  }
}