import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    const binId = url.searchParams.get('binId');
    const batchId = url.searchParams.get('batchId');

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      return NextResponse.json({ success: false, error: 'MONGODB_URI not configured' }, { status: 500 });
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('PopCycle');

    let items: any[] = [];

    if (type === 'bins') {
      items = await db.collection('bins').find({}).limit(20).toArray();
      items = items.map(bin => ({ id: bin._id, name: bin.name, isActive: bin.isActive, status: bin.status }));
    } else if (type === 'batches') {
      const query = binId ? { binId } : {};
      items = await db.collection('batches').find(query).limit(20).toArray();
      items = items.map(batch => ({ 
        id: batch._id, 
        binId: batch.binId, 
        status: batch.status,
        weight: batch.weight,
        materialType: batch.materialType,
        collectionDate: batch.collectionDate
      }));
    } else if (type === 'blanks') {
      const query = batchId ? { batchId } : {};
      items = await db.collection('blanks').find(query).limit(20).toArray();
      items = items.map(blank => ({ 
        id: blank._id, 
        batchId: blank.batchId, 
        userId: blank.userId, 
        status: blank.status,
        productId: blank.productId
      }));
    } else {
      // Return all types
      const [bins, batches, blanks] = await Promise.all([
        db.collection('bins').find({}).limit(10).toArray(),
        db.collection('batches').find({}).limit(10).toArray(),
        db.collection('blanks').find({}).limit(10).toArray()
      ]);

      items = {
        bins: bins.map(bin => ({ id: bin._id, name: bin.name, isActive: bin.isActive, status: bin.status })),
        batches: batches.map(batch => ({ id: batch._id, binId: batch.binId, status: batch.status })),
        blanks: blanks.map(blank => ({ id: blank._id, batchId: blank.batchId, userId: blank.userId, status: blank.status }))
      };
    }

    await client.close();

    return NextResponse.json({
      success: true,
      items
    });

  } catch (error) {
    console.error('Error fetching sample items:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch items'
    }, { status: 500 });
  }
}