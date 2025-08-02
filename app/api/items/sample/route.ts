import { NextResponse } from 'next/server';

// Sample data for demonstration
const sampleItems = {
  'ABC123': {
    id: 'ABC123',
    originPoint: 'Cafe Luna',
    collectionDate: '2025-01-15',
    materialType: 'HDPE',
    weight: 2.3,
    processedDate: '2025-01-20',
    carbonOffset: 5.8,
    productType: 'rover_chassis',
    transactionDate: '2025-01-28',
    deliveredDate: '2025-01-30'
  },
  'DEF456': {
    id: 'DEF456', 
    originPoint: 'TechCorp',
    collectionDate: '2025-01-12',
    materialType: 'PET',
    weight: 1.7,
    processedDate: '2025-01-18',
    carbonOffset: 4.2,
    productType: 'assembly_toy',
    transactionDate: '2025-01-24',
    deliveredDate: '2025-01-26'
  },
  'GHI789': {
    id: 'GHI789',
    originPoint: 'Green Office',
    collectionDate: '2025-01-10',
    materialType: 'HDPE',
    weight: 3.1,
    processedDate: '2025-01-16',
    carbonOffset: 7.8,
    productType: 'educational_kit',
    transactionDate: '2025-01-22',
    deliveredDate: '2025-01-24'
  },
  'JKL012': {
    id: 'JKL012',
    originPoint: 'Startup Hub',
    collectionDate: '2025-01-08',
    materialType: 'PP',
    weight: 1.9,
    processedDate: '2025-01-14',
    carbonOffset: 4.7,
    productType: 'dinnerware',
    transactionDate: '2025-01-21',
    deliveredDate: '2025-01-23'
  }
};

export async function GET() {
  return NextResponse.json(sampleItems);
}