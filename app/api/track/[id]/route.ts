import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/popcycle';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db('popcycle');
    const item = await db.collection('items').findOne({ qrCode: params.id });
    
    await client.close();
    
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      qrCode: item.qrCode,
      sourceCompany: item.sourceCompany,
      collectionDate: item.collectionDate,
      materialType: item.materialType,
      weight: item.weight,
      processedDate: item.processedDate,
      carbonOffset: item.carbonOffset,
      status: item.status,
      productType: item.productType,
      impactMetrics: {
        carbonSaved: item.carbonOffset,
        wasteReduced: item.weight,
        status: item.status
      }
    });
  } catch (error) {
    console.error('Error fetching item:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}