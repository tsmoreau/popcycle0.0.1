import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDatabase } from '../../../../lib/mongodb'
import { Order } from '../../../../lib/schemas-v3'

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()
    
    // Extract orgId query parameter if provided
    const { searchParams } = new URL(request.url)
    const orgIdParam = searchParams.get('orgId')
    
    // Build query - filter by orgId if provided, otherwise return all
    const query = orgIdParam ? { orgId: new ObjectId(orgIdParam) } : {}
    
    const orders = await db.collection<Order>('orders').find(query).toArray()
    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()
    const db = await getDatabase()
    
    // Validate required fields
    if (!orderData.orgId || !orderData.orderDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate and convert dates
    const orderDate = new Date(orderData.orderDate)
    if (isNaN(orderDate.getTime())) {
      return NextResponse.json({ error: 'Invalid order date' }, { status: 400 })
    }

    let expectedCompletionDate = undefined
    if (orderData.expectedCompletionDate) {
      expectedCompletionDate = new Date(orderData.expectedCompletionDate)
      if (isNaN(expectedCompletionDate.getTime())) {
        return NextResponse.json({ error: 'Invalid expected completion date' }, { status: 400 })
      }
    }
    
    // Convert orgId string to ObjectId
    const newOrder = {
      ...orderData,
      orgId: new ObjectId(orderData.orgId),
      orderDate,
      expectedCompletionDate,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await db.collection<Order>('orders').insertOne(newOrder as any)
    
    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const order: Order = await request.json()
    const db = await getDatabase()
    
    const { _id, ...updateData } = order
    updateData.updatedAt = new Date()
    
    const result = await db.collection<Order>('orders').updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
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
    
    const result = await db.collection<Order>('orders').deleteOne({ _id: new ObjectId(id) })
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting order:', error)
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 })
  }
}