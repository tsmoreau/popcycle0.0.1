import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

export async function GET() {
  try {
    const uri = process.env.MONGODB_URI
    
    if (!uri) {
      return NextResponse.json({
        connected: false,
        error: 'MONGODB_URI environment variable not set',
        status: 'Not Configured'
      })
    }

    const client = new MongoClient(uri, {
      connectTimeoutMS: 10000,
      socketTimeoutMS: 10000,
    })
    
    try {
      // Test connection with timeout
      await client.connect()
      const db = client.db('PopCycle')
      
      // Get basic database stats (with fallback)
      let stats: any = { dataSize: 0, storageSize: 0 }
      let collections: any[] = []
      
      try {
        const dbStats = await db.stats()
        stats = {
          dataSize: dbStats.dataSize || 0,
          storageSize: dbStats.storageSize || 0
        }
      } catch (error) {
        // Stats might require additional permissions
      }
      
      let listCollectionsError = null
      try {
        collections = await db.listCollections().toArray()
      } catch (error) {
        listCollectionsError = error instanceof Error ? error.message : 'Unknown error'
        
        // Try alternative approach - check known collections
        const knownCollections = ['users', 'orgs', 'bins', 'batches', 'items', 'products']
        const existingCollections = []
        
        for (const collName of knownCollections) {
          try {
            const collection = db.collection(collName)
            const count = await collection.estimatedDocumentCount()
            existingCollections.push({ name: collName, count })
          } catch (err) {
            // Collection doesn't exist or no access
          }
        }
        
        collections = existingCollections
      }
      
      await client.close()
      
      return NextResponse.json({
        connected: true,
        status: 'Connected',
        database: 'PopCycle',
        hostname: uri.split('@')[1]?.split('/')[0] || 'unknown',
        collections: collections.length,
        collectionsDetail: collections.map(c => c.name),
        listCollectionsError,
        dataSize: Math.round(stats.dataSize / 1024 / 1024 * 100) / 100, // MB
        storageSize: Math.round(stats.storageSize / 1024 / 1024 * 100) / 100, // MB
        lastChecked: new Date().toISOString()
      })
      
    } catch (error) {
      await client.close().catch(() => {})
      
      return NextResponse.json({
        connected: false,
        status: 'Connection Failed',
        error: error instanceof Error ? error.message : 'Unknown connection error',
        lastChecked: new Date().toISOString()
      })
    }
    
  } catch (error) {
    return NextResponse.json({
      connected: false,
      status: 'Configuration Error',
      error: error instanceof Error ? error.message : 'Unknown error',
      lastChecked: new Date().toISOString()
    })
  }
}