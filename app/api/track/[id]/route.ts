import { NextRequest, NextResponse } from 'next/server';

// Sample data for demonstration - in production this would come from MongoDB
const sampleItems = {
  'ABC123': {
    id: 'ABC123',
    originPoint: 'Cafe Luna',
    collectionDate: '2025-01-15',
    materialType: 'HDPE',
    weight: 2.3,
    processedDate: '2025-01-20',
    transactionDate: '2025-01-28',
    deliveredDate: '2025-01-30',
    productType: 'rover_chassis',
    donatingEntity: 'TechCorp Foundation',
    destination: 'Roosevelt Elementary School',
    carbonOffset: 5.8,
    event: 'Annual Sustainability Summit',
    message: 'From our cafeteria to your classroom - building the future together!',
    // ID hierarchy based on schema - all processing stages complete
    binId: 'BIN-A1B2C3',
    batchId: 'BAT-D4E5F6',
    blankId: 'BLK-G7H8I9',
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
    originPoint: 'TechCorp',
    collectionDate: '2025-01-12',
    materialType: 'PET',
    weight: 1.7,
    processedDate: '2025-01-18',
    transactionDate: '2025-01-24',
    deliveredDate: '2025-01-26',
    productType: 'assembly_toy',
    donatingEntity: null,
    destination: null,
    carbonOffset: 4.2,
    event: 'Earth Day Corporate Challenge',
    // ID hierarchy - processed into blank
    binId: 'BIN-J1K2L3',
    batchId: 'BAT-M4N5O6',
    blankId: 'BLK-P7Q8R9',
    makerDetails: null
  },
  'GHI789': {
    id: 'GHI789',
    originPoint: 'Riverside Park',
    collectionDate: '2025-01-10',
    materialType: 'HDPE',
    weight: 3.1,
    processedDate: '2025-01-16',
    transactionDate: '2025-01-22',
    deliveredDate: '2025-01-24',
    productType: 'educational_kit',
    donatingEntity: 'Local Community Fund',
    destination: 'YMCA Summer Camp',
    carbonOffset: 7.8,
    message: 'From park cleanup to learning tool - community action creates change.',
    // ID hierarchy - processed into blank
    binId: 'BIN-S1T2U3',
    batchId: 'BAT-V4W5X6',
    blankId: 'BLK-Y7Z8A9',
    makerDetails: null
  },
  'JKL012': {
    id: 'JKL012',
    originPoint: 'Startup Hub',
    collectionDate: '2025-01-08',
    materialType: 'PP',
    weight: 1.9,
    processedDate: '2025-01-14',
    transactionDate: '2025-01-21',
    deliveredDate: '2025-01-23',
    productType: 'dinnerware',
    donatingEntity: null,
    destination: null,
    carbonOffset: 4.7,
    event: 'Green Living Expo',
    // ID hierarchy - processed into blank
    binId: 'BIN-B1C2D3',
    batchId: 'BAT-E4F5G6',
    blankId: 'BLK-H7I8J9',
    makerDetails: null
  },
  'MNO345': {
    id: 'MNO345',
    originPoint: 'Green Valley Office Park',
    collectionDate: '2025-01-29',
    materialType: 'PET',
    weight: 3.2,
    processedDate: '2025-02-02',
    transactionDate: null,
    deliveredDate: null,
    productType: null,
    donatingEntity: null,
    destination: null,
    carbonOffset: null,
    event: 'Corporate Cleanup Day',
    message: 'Processed into clean plastic pellets - ready for manufacturing into educational products.',
    // ID hierarchy - processed into batch, but not yet into blanks
    binId: 'BIN-K1L2M3',
    batchId: 'BAT-N4O5P6',
    blankId: null, // No blank created yet
    makerDetails: null
  },
  'PQR678': {
    id: 'PQR678',
    originPoint: 'Riverside Community Center',
    collectionDate: '2025-01-30',
    materialType: 'HDPE',
    weight: 2.8,
    processedDate: null,
    transactionDate: null,
    deliveredDate: null,
    productType: null,
    donatingEntity: null,
    destination: null,
    carbonOffset: null,
    event: 'Weekend Volunteer Drive',
    message: 'Collected during our community volunteer cleanup - awaiting transformation into educational materials.',
    // ID hierarchy - only bin collected, no processing yet
    binId: 'BIN-Q1R2S3',
    batchId: null, // No batch created yet
    blankId: null, // No blank created yet
    makerDetails: null
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
    originPoint: item.originPoint,
    collectionDate: item.collectionDate,
    materialType: item.materialType,
    weight: item.weight,
    processedDate: item.processedDate,
    transactionDate: item.transactionDate,
    deliveredDate: item.deliveredDate,
    destination: item.destination,
    donatingEntity: item.donatingEntity,
    carbonOffset: item.carbonOffset,
    productType: item.productType,
    event: item.event,
    message: item.message,
    makerDetails: item.makerDetails,
    // ID hierarchy based on processing stage
    binId: item.binId,
    batchId: item.batchId,
    blankId: item.blankId,
    impactMetrics: {
      carbonSaved: item.carbonOffset || 0,
      wasteReduced: item.weight
    }
  });
}