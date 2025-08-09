import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    return NextResponse.json({
      success: false,
      error: 'MONGODB_URI environment variable not set',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }

  // Debug: Log the connection string (masked for security)
  const maskedUri = uri.replace(/:([^:@]{8})[^:@]*@/, ':****@');
  console.log('Attempting to connect to:', maskedUri);
  
  const client = new MongoClient(uri, {
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 5000,
  });
  
  try {
    // Connect to MongoDB
    console.log('Attempting MongoDB connection...');
    await client.connect();
    console.log('Connected successfully!');
    
    // Test database access
    const db = client.db('popcycle');
    
    // List collections
    const collections = await db.listCollections().toArray();
    
    // Test write/read operations
    const testCollection = db.collection('connection_test');
    const testDoc = { 
      test: true, 
      timestamp: new Date(),
      message: 'Database connection test successful'
    };
    
    const insertResult = await testCollection.insertOne(testDoc);
    const foundDoc = await testCollection.findOne({ _id: insertResult.insertedId });
    
    // Clean up
    await testCollection.deleteOne({ _id: insertResult.insertedId });
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      database: db.databaseName,
      collections: collections.map(c => c.name),
      testOperations: {
        insert: !!insertResult.insertedId,
        read: !!foundDoc,
        delete: true
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      type: error.constructor.name,
      timestamp: new Date().toISOString()
    }, { status: 500 });
    
  } finally {
    await client.close();
  }
}