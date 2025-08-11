import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDatabase } from '../../../../lib/mongodb'
import { Blank } from '../../../../lib/schemas'

export async function GET() {
  try {
    const db = await getDatabase()
    const blanks = await db.collection<Blank>('blanks').find({}).toArray()
    return NextResponse.json(blanks)
  } catch (error) {
    console.error('Error fetching blanks:', error)
    return NextResponse.json({ error: 'Failed to fetch blanks' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const blank: Blank = await request.json()
    const db = await getDatabase()
    
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
    
    const result = await db.collection<Blank>('blanks').deleteOne({ _id: id })
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Blank not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting blank:', error)
    return NextResponse.json({ error: 'Failed to delete blank' }, { status: 500 })
  }
}