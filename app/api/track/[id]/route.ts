import { NextRequest, NextResponse } from 'next/server';

// Sample data for demonstration - in production this would come from MongoDB
const sampleItems = {
  'ABC123': {
    id: 'ABC123',
    qrCode: 'ABC123',
    sourceCompany: 'Cafe Luna',
    collectionDate: '2025-01-15',
    materialType: 'HDPE',
    weight: 2.3,
    processedDate: '2025-01-20',
    carbonOffset: 5.8,
    status: 'delivered',
    productType: 'rover_chassis',
    event: 'Annual Sustainability Summit',
    message: 'From our cafeteria to your classroom - building the future together!'
  },
  'DEF456': {
    id: 'DEF456',
    qrCode: 'DEF456', 
    sourceCompany: 'TechCorp',
    collectionDate: '2025-01-12',
    materialType: 'PET',
    weight: 1.7,
    processedDate: '2025-01-18',
    carbonOffset: 4.2,
    status: 'assembled',
    productType: 'assembly_toy',
    event: 'Earth Day Corporate Challenge'
  },
  'GHI789': {
    id: 'GHI789',
    qrCode: 'GHI789',
    sourceCompany: 'Green Office',
    collectionDate: '2025-01-10',
    materialType: 'HDPE',
    weight: 3.1,
    processedDate: '2025-01-16',
    carbonOffset: 7.8,
    status: 'processed',
    productType: 'educational_kit',
    message: 'Every piece of plastic has a story. This one becomes a learning tool.'
  },
  'JKL012': {
    id: 'JKL012',
    qrCode: 'JKL012',
    sourceCompany: 'Startup Hub',
    collectionDate: '2025-01-08',
    materialType: 'PP',
    weight: 1.9,
    processedDate: '2025-01-14',
    carbonOffset: 4.7,
    status: 'delivered',
    productType: 'dinnerware'
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = sampleItems[id.toUpperCase() as keyof typeof sampleItems];
  
  if (!item) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }
  
  return NextResponse.json({
    id: item.id,
    qrCode: item.qrCode,
    sourceCompany: item.sourceCompany,
    collectionDate: item.collectionDate,
    materialType: item.materialType,
    weight: item.weight,
    processedDate: item.processedDate,
    carbonOffset: item.carbonOffset,
    status: item.status,
    productType: item.productType,
    event: item.event,
    message: item.message,
    impactMetrics: {
      carbonSaved: item.carbonOffset,
      wasteReduced: item.weight,
      status: item.status
    }
  });
}