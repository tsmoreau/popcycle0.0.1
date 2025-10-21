import { NextResponse } from 'next/server';
import { getGCSClient, getBucketName } from '../../../../lib/gcs';

export async function GET() {
  try {
    const projectId = process.env.GCS_PROJECT_ID;
    const bucketName = process.env.GCS_BUCKET_NAME;
    const serviceAccountKey = process.env.GCS_SERVICE_ACCOUNT_KEY;
    
    if (!projectId || !bucketName || !serviceAccountKey) {
      return NextResponse.json({
        connected: false,
        error: 'GCS environment variables not set',
        status: 'Not Configured'
      });
    }

    try {
      const storage = getGCSClient();
      const bucket = storage.bucket(getBucketName());
      
      // Test bucket access by checking if bucket exists
      const [exists] = await bucket.exists();
      
      if (!exists) {
        return NextResponse.json({
          connected: false,
          status: 'Bucket Not Found',
          error: `Bucket "${bucketName}" does not exist`,
          lastChecked: new Date().toISOString()
        });
      }

      // Get bucket metadata to verify we have access
      const [metadata] = await bucket.getMetadata();
      
      return NextResponse.json({
        connected: true,
        status: 'Connected',
        bucket: bucketName,
        projectId: projectId,
        location: metadata.location || 'unknown',
        storageClass: metadata.storageClass || 'unknown',
        lastChecked: new Date().toISOString()
      });
      
    } catch (error) {
      return NextResponse.json({
        connected: false,
        status: 'Connection Failed',
        error: error instanceof Error ? error.message : 'Unknown connection error',
        lastChecked: new Date().toISOString()
      });
    }
    
  } catch (error) {
    return NextResponse.json({
      connected: false,
      status: 'Configuration Error',
      error: error instanceof Error ? error.message : 'Unknown error',
      lastChecked: new Date().toISOString()
    });
  }
}
