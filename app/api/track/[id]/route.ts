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
    purchasedDate: '2025-01-28',
    deliveredDate: '2025-01-30',
    isCharity: true,
    destination: 'Roosevelt Elementary School',
    donatingEntity: 'TechCorp Foundation',
    carbonOffset: 5.8,
    productType: 'rover_chassis',
    event: 'Annual Sustainability Summit',
    message: 'From our cafeteria to your classroom - building the future together!',
    makerDetails: {
      userId: 'user_001',
      name: 'Sarah Chen',
      location: 'Portland, OR',
      assemblyDate: '2025-02-01',
      story: 'Built this rover chassis with my daughter Emma for her robotics club! She\'s fascinated by how waste becomes functional tech. We spent three hours assembling it together - she did all the precision work while I held pieces steady. Now it\'s ready for their Mars exploration project.',
      registeredAt: '2025-02-01T19:30:00Z',
      verifiedEmail: 'sarah.chen@email.com'
    }
  },
  'DEF456': {
    id: 'DEF456',
    qrCode: 'DEF456', 
    originPoint: 'TechCorp',
    collectionDate: '2025-01-12',
    materialType: 'PET',
    weight: 1.7,
    processedDate: '2025-01-18',
    purchasedDate: '2025-01-24',
    deliveredDate: '2025-01-26',
    isCharity: false,
    destination: 'Customer',
    carbonOffset: 4.2,
    productType: 'assembly_toy',
    event: 'Earth Day Corporate Challenge',
    makerDetails: null // Unregistered - shows CTA
  },
  'GHI789': {
    id: 'GHI789',
    qrCode: 'GHI789',
    originPoint: 'Riverside Park',
    collectionDate: '2025-01-10',
    materialType: 'HDPE',
    weight: 3.1,
    processedDate: '2025-01-16',
    purchasedDate: '2025-01-22',
    deliveredDate: '2025-01-24',
    isCharity: true,
    destination: 'YMCA Summer Camp',
    donatingEntity: 'Local Community Fund',
    carbonOffset: 7.8,
    productType: 'educational_kit',
    message: 'From park cleanup to learning tool - community action creates change.',
    makerDetails: {
      userId: 'user_002',
      name: 'Marcus Thompson',
      location: 'Denver, CO',
      assemblyDate: '2025-01-26',
      story: 'Assembled this educational kit for my nephew\'s birthday. Amazing to see how plastic bottles from our local park cleanup became this hands-on learning tool. The instructions were clear and it took about 90 minutes. He loves building things and understanding how recycling actually works.',
      registeredAt: '2025-01-26T16:45:00Z',
      verifiedEmail: 'marcus.t@email.com'
    }
  },
  'JKL012': {
    id: 'JKL012',
    qrCode: 'JKL012',
    originPoint: 'Startup Hub',
    collectionDate: '2025-01-08',
    materialType: 'PP',
    weight: 1.9,
    processedDate: '2025-01-14',
    purchasedDate: '2025-01-21',
    deliveredDate: '2025-01-23',
    isCharity: false,
    destination: 'Customer',
    carbonOffset: 4.7,
    productType: 'dinnerware',
    makerDetails: null // Another unregistered example
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
    purchasedDate: item.purchasedDate,
    deliveredDate: item.deliveredDate,
    isCharity: item.isCharity,
    destination: item.destination,
    donatingEntity: item.donatingEntity,
    carbonOffset: item.carbonOffset,
    productType: item.productType,
    event: item.event,
    message: item.message,
    makerDetails: item.makerDetails,
    impactMetrics: {
      carbonSaved: item.carbonOffset,
      wasteReduced: item.weight
    }
  });
}