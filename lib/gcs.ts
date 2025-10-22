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

export function sanitizeFilename(filename: string): string {
  const ext = filename.substring(filename.lastIndexOf('.'));
  const name = filename.substring(0, filename.lastIndexOf('.'));
  
  const sanitized = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return `${sanitized}${ext.toLowerCase()}`;
}

export interface UploadFileOptions {
  buffer: Buffer;
  originalFilename: string;
  productId: string;
  category: 'cnc' | 'laser' | 'instructions' | 'photos' | 'assets';
  makePublic?: boolean;
}

export async function uploadFile(options: UploadFileOptions): Promise<string> {
  const { buffer, originalFilename, productId, category, makePublic = false } = options;
  
  const storage = getGCSClient();
  const bucket = storage.bucket(getBucketName());
  
  const sanitized = sanitizeFilename(originalFilename);
  const timestamp = Date.now();
  const filename = `${sanitized.substring(0, sanitized.lastIndexOf('.'))}-${timestamp}${sanitized.substring(sanitized.lastIndexOf('.'))}`;
  
  let filePath: string;
  switch (category) {
    case 'cnc':
      filePath = `products/${productId}/design/cnc/${filename}`;
      break;
    case 'laser':
      filePath = `products/${productId}/design/laser/${filename}`;
      break;
    case 'instructions':
      filePath = `products/${productId}/instructions/${filename}`;
      break;
    case 'photos':
      filePath = `products/${productId}/photos/${filename}`;
      break;
    case 'assets':
      filePath = `products/${productId}/assets/${filename}`;
      break;
  }
  
  const file = bucket.file(filePath);
  
  await file.save(buffer, {
    metadata: {
      contentType: getContentType(originalFilename),
    },
  });
  
  if (makePublic) {
    await file.makePublic();
  }
  
  return filePath;
}

export async function deleteFile(filePath: string): Promise<void> {
  const storage = getGCSClient();
  const bucket = storage.bucket(getBucketName());
  const file = bucket.file(filePath);
  
  await file.delete();
}

export async function generateSignedUrl(filePath: string, expiresInMinutes: number = 60): Promise<string> {
  const storage = getGCSClient();
  const bucket = storage.bucket(getBucketName());
  const file = bucket.file(filePath);
  
  const [signedUrl] = await file.getSignedUrl({
    version: 'v4',
    action: 'read',
    expires: Date.now() + expiresInMinutes * 60 * 1000,
  });
  
  return signedUrl;
}

export async function generateSignedUrls(filePaths: string[], expiresInMinutes: number = 60): Promise<Record<string, string>> {
  const urls: Record<string, string> = {};
  
  await Promise.all(
    filePaths.map(async (path) => {
      urls[path] = await generateSignedUrl(path, expiresInMinutes);
    })
  );
  
  return urls;
}

export function getPublicUrl(filePath: string): string {
  const bucketName = getBucketName();
  return `https://storage.googleapis.com/${bucketName}/${filePath}`;
}

function getContentType(filename: string): string {
  const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
  
  const contentTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.dxf': 'application/dxf',
    '.ai': 'application/postscript',
    '.eps': 'application/postscript',
    '.dwg': 'application/acad',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.ogg': 'video/ogg',
  };
  
  return contentTypes[ext] || 'application/octet-stream';
}
