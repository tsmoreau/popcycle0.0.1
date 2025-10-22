import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDatabase } from '../../../../../../lib/mongodb';
import { uploadFile, deleteFile, getPublicUrl } from '../../../../../../lib/gcs';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const formData = await request.formData();
    
    const file = formData.get('file') as File;
    const category = formData.get('category') as 'cnc' | 'laser' | 'instructions' | 'photos';
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    if (!category || !['cnc', 'laser', 'instructions', 'photos'].includes(category)) {
      return NextResponse.json({ error: 'Valid category is required' }, { status: 400 });
    }
    
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Upload to GCS
    const filePath = await uploadFile({
      buffer,
      originalFilename: file.name,
      productId,
      category,
      makePublic: category === 'photos', // Only photos are public
    });
    
    // Update MongoDB product record
    const db = await getDatabase();
    const updateField = getUpdateField(category);
    
    await db.collection('products').updateOne(
      { _id: new ObjectId(productId) },
      { 
        $push: { [updateField]: filePath },
        $set: { updatedAt: new Date() }
      }
    );
    
    // Return file info
    const fileUrl = category === 'photos' 
      ? getPublicUrl(filePath)
      : filePath; // For private files, we'll generate signed URL on fetch
    
    return NextResponse.json({
      success: true,
      filePath,
      fileUrl,
      category
    });
    
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload file' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const { filePath, category } = await request.json();
    
    if (!filePath || !category) {
      return NextResponse.json(
        { error: 'filePath and category are required' },
        { status: 400 }
      );
    }
    
    if (!['cnc', 'laser', 'instructions', 'photos'].includes(category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }
    
    // Delete from GCS
    await deleteFile(filePath);
    
    // Remove from MongoDB product record
    const db = await getDatabase();
    const updateField = getUpdateField(category);
    
    await db.collection('products').updateOne(
      { _id: new ObjectId(productId) },
      { 
        $pull: { [updateField]: filePath },
        $set: { updatedAt: new Date() }
      }
    );
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete file' },
      { status: 500 }
    );
  }
}

function getUpdateField(category: string): string {
  switch (category) {
    case 'cnc':
      return 'designFiles.cncVectors';
    case 'laser':
      return 'designFiles.laserVectors';
    case 'instructions':
      return 'designFiles.instructionsPdfs';
    case 'photos':
      return 'designFiles.photos';
    default:
      throw new Error(`Invalid category: ${category}`);
  }
}
