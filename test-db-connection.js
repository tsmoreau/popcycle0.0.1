const { MongoClient } = require('mongodb');

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('❌ MONGODB_URI environment variable is not set');
    return;
  }
  
  console.log('🔗 Testing MongoDB connection...');
  console.log(`📍 Connecting to: ${uri.replace(/:([^:@]{8})[^:@]*@/, ':****@')}`);
  
  const client = new MongoClient(uri);
  
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Connected to MongoDB successfully!');
    
    // Test database access
    const db = client.db('popcycle');
    console.log(`📚 Connected to database: ${db.databaseName}`);
    
    // List collections (will be empty initially)
    const collections = await db.listCollections().toArray();
    console.log(`📝 Current collections: ${collections.length > 0 ? collections.map(c => c.name).join(', ') : 'None (this is normal for a new database)'}`);
    
    // Test write access by inserting and then removing a test document
    const testCollection = db.collection('connection_test');
    const testDoc = { test: true, timestamp: new Date() };
    
    const insertResult = await testCollection.insertOne(testDoc);
    console.log('✅ Write test successful - inserted test document');
    
    // Clean up test document
    await testCollection.deleteOne({ _id: insertResult.insertedId });
    console.log('✅ Delete test successful - cleaned up test document');
    
    // Drop the test collection
    await testCollection.drop();
    console.log('✅ Test collection cleaned up');
    
    console.log('🎉 All database operations working correctly!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error details:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.error('🔐 Check your username/password in the connection string');
    } else if (error.message.includes('network')) {
      console.error('🌐 Check your network access settings in MongoDB Atlas');
    }
  } finally {
    await client.close();
    console.log('🔌 Connection closed');
  }
}

testConnection();