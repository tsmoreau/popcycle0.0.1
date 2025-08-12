import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

interface AssembledItem {
  id: string;
  batchId: string;
  productId?: string;
  status: string;
  assemblyDate?: string;
  deliveryDate?: string;
  deliveredDate?: string;
  weight?: number;
  productName?: string;
  productDescription?: string;
}

export async function GET(request: Request) {
  try {
    // Get the current session to identify the user
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      return NextResponse.json({ success: false, error: 'MONGODB_URI not configured' }, { status: 500 });
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('PopCycle');

    // First get the user's ObjectId from their email
    const user = await db.collection('users').findOne({ email: session.user.email });
    if (!user) {
      await client.close();
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Find all blanks assigned to this user
    const blanks = await db.collection('blanks').find({ 
      userId: user._id 
    }).sort({ assemblyDate: -1, _id: -1 }).limit(20).toArray();

    // Get product details for blanks that have productId
    const productIds = blanks.filter(blank => blank.productId).map(blank => blank.productId);
    const products = productIds.length > 0 
      ? await db.collection('products').find({ _id: { $in: productIds } }).toArray()
      : [];

    // Create a product lookup map
    const productMap = new Map();
    products.forEach(product => {
      productMap.set(product._id.toString(), product);
    });

    // Format the assembled items with product information
    const assembledItems: AssembledItem[] = blanks.map((blank: any) => {
      const product = blank.productId ? productMap.get(blank.productId.toString()) : null;
      
      return {
        id: blank._id.toString(),
        batchId: blank.batchId,
        productId: blank.productId?.toString(),
        status: blank.status,
        assemblyDate: blank.assemblyDate,
        deliveryDate: blank.deliveryDate,
        deliveredDate: blank.deliveredDate,
        weight: blank.weight,
        productName: product?.name,
        productDescription: product?.description
      };
    });

    await client.close();

    return NextResponse.json({
      success: true,
      items: assembledItems
    });

  } catch (error) {
    console.error('Error fetching user items:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch user items'
    }, { status: 500 });
  }
}