import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

export async function DELETE() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()
    const db = client.db('PopCycle')
    
    // Clear all products
    const result = await db.collection('products').deleteMany({})
    
    await client.close()
    return NextResponse.json({ 
      message: 'Products cleared successfully',
      deletedCount: result.deletedCount
    })
  } catch (error) {
    console.error('Error clearing products:', error)
    return NextResponse.json({ error: 'Failed to clear products' }, { status: 500 })
  }
}