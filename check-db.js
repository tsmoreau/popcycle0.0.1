const { MongoClient } = require('mongodb');

async function checkDatabase() {
  let client;
  try {
    // Connect to MongoDB
    client = new MongoClient(process.env.MONGODB_URI || process.env.DATABASE_URL);
    await client.connect();
    
    const db = client.db();
    console.log('Connected to database:', db.databaseName);
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('\n=== COLLECTIONS ===');
    collections.forEach(col => {
      console.log(`- ${col.name}`);
    });
    
    // For each collection, show sample documents and structure
    for (const col of collections) {
      console.log(`\n=== COLLECTION: ${col.name} ===`);
      const collection = db.collection(col.name);
      
      // Get count
      const count = await collection.countDocuments();
      console.log(`Document count: ${count}`);
      
      if (count > 0) {
        // Get sample document
        const sample = await collection.findOne();
        console.log('Sample document structure:');
        console.log(JSON.stringify(sample, null, 2));
        
        // Get all field names from multiple documents
        const pipeline = [
          { $limit: 100 },
          { $project: { arrayofkeyvalue: { $objectToArray: "$$ROOT" } } },
          { $unwind: "$arrayofkeyvalue" },
          { $group: { _id: null, allkeys: { $addToSet: "$arrayofkeyvalue.k" } } }
        ];
        
        try {
          const fieldResult = await collection.aggregate(pipeline).toArray();
          if (fieldResult.length > 0) {
            console.log('All fields found in collection:');
            fieldResult[0].allkeys.sort().forEach(field => console.log(`  - ${field}`));
          }
        } catch (e) {
          console.log('Could not get field list:', e.message);
        }
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

checkDatabase();