import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// Define interfaces for better type safety
interface BinItem {
  id: string;
  name: string;
  isActive: boolean;
  status: string;
}

interface BatchItem {
  id: string;
  binId: string;
  status: string;
  weight?: number;
  materialType?: string;
  collectionDate?: string;
}

interface BlankItem {
  id: string;
  batchId: string;
  userId: string;
  status: string;
  productId?: string;
}

interface AllItemsResponse {
  bins: BinItem[];
  batches: BatchItem[];
  blanks: BlankItem[];
}

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

    let items: BinItem[] | BatchItem[] | BlankItem[] | AllItemsResponse;

    if (type === 'bins') {
      const binDocs = await db.collection('bins').find({}).limit(20).toArray();
      items = binDocs.map((bin: any): BinItem => ({ 
        id: bin._id.toString(), 
        name: bin.name, 
        isActive: bin.isActive, 
        status: bin.status 
      }));
    } else if (type === 'batches') {
      const query = binId ? { binId } : {};
      const batchDocs = await db.collection('batches').find(query).limit(20).toArray();
      items = batchDocs.map((batch: any): BatchItem => ({ 
        id: batch._id.toString(), 
        binId: batch.binId, 
        status: batch.status,
        weight: batch.weight,
        materialType: batch.materialType,
        collectionDate: batch.collectionDate
      }));
    } else if (type === 'blanks') {
      const query = batchId ? { batchId } : {};
      const blankDocs = await db.collection('blanks').find(query).limit(20).toArray();
      items = blankDocs.map((blank: any): BlankItem => ({ 
        id: blank._id.toString(), 
        batchId: blank.batchId, 
        userId: blank.userId, 
        status: blank.status,
        productId: blank.productId
      }));
    } else {
      // Return all types
      const [binDocs, batchDocs, blankDocs] = await Promise.all([
        db.collection('bins').find({}).limit(10).toArray(),
        db.collection('batches').find({}).limit(10).toArray(),
        db.collection('blanks').find({}).limit(10).toArray()
      ]);

      items = {
        bins: binDocs.map((bin: any): BinItem => ({ 
          id: bin._id.toString(), 
          name: bin.name, 
          isActive: bin.isActive, 
          status: bin.status 
        })),
        batches: batchDocs.map((batch: any): BatchItem => ({ 
          id: batch._id.toString(), 
          binId: batch.binId, 
          status: batch.status 
        })),
        blanks: blankDocs.map((blank: any): BlankItem => ({ 
          id: blank._id.toString(), 
          batchId: blank.batchId, 
          userId: blank.userId, 
          status: blank.status 
        }))
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