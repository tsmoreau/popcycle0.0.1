import { MongoClient, Db } from 'mongodb';

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

// Enhanced MongoDB environment validation for production
function validateMongoDBEnvironment() {
  console.log('=== MONGODB ENVIRONMENT VALIDATION ===');
  
  if (!process.env.MONGODB_URI) {
    const error = 'Invalid/Missing environment variable: "MONGODB_URI"';
    console.error('❌', error);
    throw new Error(error);
  }
  
  const uri = process.env.MONGODB_URI;
  
  // Basic URI format validation
  if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    const error = 'Invalid MONGODB_URI format. Must start with mongodb:// or mongodb+srv://';
    console.error('❌', error);
    throw new Error(error);
  }
  
  console.log('✅ MONGODB_URI is properly configured');
  console.log(`✅ MongoDB connection protocol: ${uri.startsWith('mongodb+srv://') ? 'SRV (Atlas)' : 'Standard'}`);
  
  return uri;
}

const uri = validateMongoDBEnvironment();
const options = {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close socket after 45 seconds of inactivity
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the client across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db('PopCycle');
}

export { clientPromise };