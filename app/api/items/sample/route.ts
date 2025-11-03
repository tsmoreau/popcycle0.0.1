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
  binIds: string[];
  status: string;
  weight?: number;
  materialType?: string;
  collectionDate?: string;
}

interface BlankItem {
  id: string;
  batchIds: string[];
  userId: string;
  status: string;
}

interface ItemItem {
  id: string;
  blankIds?: string[];
  batchIds?: string[];
  productId: string;
  userId?: string;
  status: string;
  serialNumber?: string;
}

interface AllItemsResponse {
  bins: BinItem[];
  batches: BatchItem[];
  blanks: BlankItem[];
  items: ItemItem[];
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    const binId = url.searchParams.get('binId');
    const batchId = url.searchParams.get('batchId');
    const blankId = url.searchParams.get('blankId');

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      return NextResponse.json({ success: false, error: 'MONGODB_URI not configured' }, { status: 500 });
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('PopCycle');

    let items: BinItem[] | BatchItem[] | BlankItem[] | ItemItem[] | AllItemsResponse;

    if (type === 'bins') {
      const binDocs = await db.collection('bins').find({}).limit(20).toArray();
      items = binDocs.map((bin: any): BinItem => ({ 
        id: bin._id.toString(), 
        name: bin.name, 
        isActive: bin.isActive, 
        status: bin.status 
      }));
    } else if (type === 'batches') {
      const query = binId ? { binIds: binId } : {};
      const batchDocs = await db.collection('batches').find(query).limit(20).toArray();
      items = batchDocs.map((batch: any): BatchItem => ({ 
        id: batch._id.toString(), 
        binIds: batch.binIds || [], 
        status: batch.status,
        weight: batch.weight,
        materialType: batch.materialType,
        collectionDate: batch.collectionDate
      }));
    } else if (type === 'blanks') {
      const query = batchId ? { batchIds: batchId } : {};
      const blankDocs = await db.collection('blanks').find(query).limit(20).toArray();
      items = blankDocs.map((blank: any): BlankItem => ({ 
        id: blank._id.toString(), 
        batchIds: blank.batchIds || [], 
        userId: blank.userId, 
        status: blank.status
      }));
    } else if (type === 'items') {
      let query: any = {};
      if (blankId) {
        query.blankIds = blankId;
      } else if (batchId) {
        query.batchIds = batchId;
      }
      const itemDocs = await db.collection('items').find(query).limit(20).toArray();
      items = itemDocs.map((item: any): ItemItem => ({
        id: item._id.toString(),
        blankIds: item.blankIds || [],
        batchIds: item.batchIds || [],
        productId: item.productId,
        userId: item.userId,
        status: item.status,
        serialNumber: item.serialNumber
      }));
    } else {
      // Return all types
      const [binDocs, batchDocs, blankDocs, itemDocs] = await Promise.all([
        db.collection('bins').find({}).limit(10).toArray(),
        db.collection('batches').find({}).limit(10).toArray(),
        db.collection('blanks').find({}).limit(10).toArray(),
        db.collection('items').find({}).limit(10).toArray()
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
          binIds: batch.binIds || [], 
          status: batch.status 
        })),
        blanks: blankDocs.map((blank: any): BlankItem => ({ 
          id: blank._id.toString(), 
          batchIds: blank.batchIds || [], 
          userId: blank.userId, 
          status: blank.status 
        })),
        items: itemDocs.map((item: any): ItemItem => ({
          id: item._id.toString(),
          blankIds: item.blankIds || [],
          batchIds: item.batchIds || [],
          productId: item.productId,
          userId: item.userId,
          status: item.status,
          serialNumber: item.serialNumber
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