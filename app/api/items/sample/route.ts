import { NextResponse } from 'next/server';

// Sample data for demonstration
const sampleItems = {
  'ABC123': {
    qrCode: 'ABC123',
    sourceCompany: 'Cafe Luna',
    collectionDate: '2025-01-15',
    materialType: 'HDPE',
    weight: 2.3,
    processedDate: '2025-01-20',
    carbonOffset: 5.8,
    status: 'delivered',
    productType: 'rover_chassis'
  },
  'DEF456': {
    qrCode: 'DEF456', 
    sourceCompany: 'TechCorp',
    collectionDate: '2025-01-12',
    materialType: 'PET',
    weight: 1.7,
    processedDate: '2025-01-18',
    carbonOffset: 4.2,
    status: 'assembled',
    productType: 'assembly_toy'
  },
  'GHI789': {
    qrCode: 'GHI789',
    sourceCompany: 'Green Office',
    collectionDate: '2025-01-10',
    materialType: 'HDPE',
    weight: 3.1,
    processedDate: '2025-01-16',
    carbonOffset: 7.8,
    status: 'processed',
    productType: 'educational_kit'
  },
  'JKL012': {
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

export async function GET() {
  return NextResponse.json(sampleItems);
}