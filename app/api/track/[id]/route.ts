import { NextRequest, NextResponse } from 'next/server';

// Sample data for demonstration - in production this would come from MongoDB
const sampleItems = {
  'ABC123': {
    id: 'ABC123',
    qrCode: 'ABC123',
    originPoint: 'Cafe Luna',
    collectionDate: '2025-01-15',
    materialType: 'HDPE',
    weight: 2.3,
    processedDate: '2025-01-20',
    assembledDate: '2025-01-25',
    purchasedDate: '2025-01-28',
    isCharity: true,
    destination: 'Roosevelt Elementary School',
    donatingEntity: 'TechCorp Foundation',
    carbonOffset: 5.8,
    productType: 'rover_chassis',
    event: 'Annual Sustainability Summit',
    message: 'From our cafeteria to your classroom - building the future together!'
  },
  'DEF456': {
    id: 'DEF456',
    qrCode: 'DEF456', 
    originPoint: 'TechCorp',
    collectionDate: '2025-01-12',
    materialType: 'PET',
    weight: 1.7,
    processedDate: '2025-01-18',
    assembledDate: '2025-01-22',
    purchasedDate: '2025-01-24',
    isCharity: false,
    destination: 'Customer',
    carbonOffset: 4.2,
    productType: 'assembly_toy',
    event: 'Earth Day Corporate Challenge'
  },
  'GHI789': {
    id: 'GHI789',
    qrCode: 'GHI789',
    originPoint: 'Riverside Park',
    collectionDate: '2025-01-10',
    materialType: 'HDPE',
    weight: 3.1,
    processedDate: '2025-01-16',
    assembledDate: '2025-01-20',
    purchasedDate: '2025-01-22',
    isCharity: true,
    destination: 'YMCA Summer Camp',
    donatingEntity: 'Local Community Fund',
    carbonOffset: 7.8,
    productType: 'educational_kit',
    message: 'From park cleanup to learning tool - community action creates change.'
  },
  'JKL012': {
    id: 'JKL012',
    qrCode: 'JKL012',
    originPoint: 'Startup Hub',
    collectionDate: '2025-01-08',
    materialType: 'PP',
    weight: 1.9,
    processedDate: '2025-01-14',
    assembledDate: '2025-01-19',
    purchasedDate: '2025-01-21',
    isCharity: false,
    destination: 'Customer',
    carbonOffset: 4.7,
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
    originPoint: item.originPoint,
    collectionDate: item.collectionDate,
    materialType: item.materialType,
    weight: item.weight,
    processedDate: item.processedDate,
    assembledDate: item.assembledDate,
    purchasedDate: item.purchasedDate,
    isCharity: item.isCharity,
    destination: item.destination,
    donatingEntity: item.donatingEntity,
    carbonOffset: item.carbonOffset,
    productType: item.productType,
    event: item.event,
    message: item.message,
    impactMetrics: {
      carbonSaved: item.carbonOffset,
      wasteReduced: item.weight
    }
  });
}