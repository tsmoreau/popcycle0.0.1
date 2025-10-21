import { Storage } from '@google-cloud/storage';

let storage: Storage | null = null;

export function getGCSClient(): Storage {
  if (storage) {
    return storage;
  }

  const projectId = process.env.GCS_PROJECT_ID;
  const serviceAccountKey = process.env.GCS_SERVICE_ACCOUNT_KEY;

  if (!projectId || !serviceAccountKey) {
    throw new Error('GCS credentials not configured');
  }

  try {
    const credentials = JSON.parse(serviceAccountKey);
    
    storage = new Storage({
      projectId,
      credentials,
    });

    return storage;
  } catch (error) {
    throw new Error(`Failed to initialize GCS client: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function getBucketName(): string {
  const bucketName = process.env.GCS_BUCKET_NAME;
  
  if (!bucketName) {
    throw new Error('GCS_BUCKET_NAME not configured');
  }
  
  return bucketName;
}
