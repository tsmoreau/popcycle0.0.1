// Deployment configuration validation utility
// This helps ensure all required environment variables are set for production deployment

export interface DeploymentConfig {
  environment: 'development' | 'production';
  nextAuthUrl: string;
  mongodbUri: string;
  port: string;
  repoInfo: {
    replId?: string;
    replSlug?: string;
    replOwner?: string;
    deploymentUrl?: string;
  };
}

export function validateDeploymentConfig(): DeploymentConfig {
  console.log('=== DEPLOYMENT CONFIGURATION VALIDATION ===');
  
  const environment = (process.env.NODE_ENV as 'development' | 'production') || 'development';
  console.log(`🌍 Environment: ${environment}`);
  
  // Validate NEXTAUTH_URL with fallbacks
  let nextAuthUrl = process.env.NEXTAUTH_URL;
  
  if (!nextAuthUrl) {
    console.warn('⚠️ NEXTAUTH_URL not explicitly set, using fallbacks...');
    
    if (process.env.REPLIT_DEPLOYMENT_URL) {
      nextAuthUrl = process.env.REPLIT_DEPLOYMENT_URL;
      console.log(`✅ Using REPLIT_DEPLOYMENT_URL: ${nextAuthUrl}`);
    } else if (process.env.REPL_SLUG && process.env.REPL_OWNER) {
      nextAuthUrl = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
      console.log(`✅ Using REPL domain: ${nextAuthUrl}`);
    } else if (environment === 'development') {
      nextAuthUrl = 'http://localhost:3000';
      console.log(`✅ Using development fallback: ${nextAuthUrl}`);
    } else {
      throw new Error('NEXTAUTH_URL must be set in production environment');
    }
  } else {
    console.log(`✅ NEXTAUTH_URL explicitly set: ${nextAuthUrl}`);
  }
  
  // Validate MongoDB URI for production
  const mongodbUri = process.env.MONGODB_URI;
  if (!mongodbUri) {
    throw new Error('MONGODB_URI is required for database connections');
  }
  console.log('✅ MONGODB_URI is configured');
  
  // Port configuration
  const port = process.env.PORT || '3000';
  console.log(`✅ Port: ${port}`);
  
  // Gather Replit environment info
  const repoInfo = {
    replId: process.env.REPL_ID,
    replSlug: process.env.REPL_SLUG,
    replOwner: process.env.REPL_OWNER,
    deploymentUrl: process.env.REPLIT_DEPLOYMENT_URL,
  };
  
  console.log('📊 Replit Environment Info:', {
    replId: repoInfo.replId ? 'present' : 'missing',
    replSlug: repoInfo.replSlug || 'missing',
    replOwner: repoInfo.replOwner || 'missing',
    deploymentUrl: repoInfo.deploymentUrl || 'missing',
  });
  
  const config: DeploymentConfig = {
    environment,
    nextAuthUrl,
    mongodbUri,
    port,
    repoInfo,
  };
  
  console.log('✅ Deployment configuration validated successfully');
  console.log('=== END DEPLOYMENT VALIDATION ===');
  
  return config;
}

// Export a validated config instance
export const deploymentConfig = validateDeploymentConfig();