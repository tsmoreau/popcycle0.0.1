// Platform-agnostic deployment configuration validation utility
// Works with Replit, Vercel, Railway, Render, Netlify, and other hosting providers

export interface DeploymentConfig {
  environment: 'development' | 'production';
  nextAuthUrl: string;
  mongodbUri: string;
  port: string;
  platform: {
    name: string;
    detected: boolean;
    info: Record<string, any>;
  };
}

export function validateDeploymentConfig(): DeploymentConfig {
  console.log('=== DEPLOYMENT CONFIGURATION VALIDATION ===');
  
  const environment = (process.env.NODE_ENV as 'development' | 'production') || 'development';
  console.log(`🌍 Environment: ${environment}`);
  
  // Platform detection and NEXTAUTH_URL validation with multi-platform fallbacks
  let nextAuthUrl = process.env.NEXTAUTH_URL;
  let detectedPlatform = { name: 'unknown', detected: false, info: {} };
  
  // Detect hosting platform
  if (process.env.VERCEL_URL) {
    detectedPlatform = { name: 'Vercel', detected: true, info: { url: process.env.VERCEL_URL } };
  } else if (process.env.RAILWAY_PUBLIC_DOMAIN) {
    detectedPlatform = { name: 'Railway', detected: true, info: { domain: process.env.RAILWAY_PUBLIC_DOMAIN } };
  } else if (process.env.RENDER_EXTERNAL_URL) {
    detectedPlatform = { name: 'Render', detected: true, info: { url: process.env.RENDER_EXTERNAL_URL } };
  } else if (process.env.NETLIFY_URL) {
    detectedPlatform = { name: 'Netlify', detected: true, info: { url: process.env.NETLIFY_URL } };
  } else if (process.env.REPL_SLUG) {
    detectedPlatform = { name: 'Replit', detected: true, info: { slug: process.env.REPL_SLUG, owner: process.env.REPL_OWNER } };
  } else if (environment === 'development') {
    detectedPlatform = { name: 'Development', detected: true, info: { port: process.env.PORT || '3000' } };
  }
  
  console.log(`🚀 Detected platform: ${detectedPlatform.name}`);
  
  if (!nextAuthUrl) {
    console.warn('⚠️ NEXTAUTH_URL not explicitly set, using platform-specific fallbacks...');
    
    if (process.env.VERCEL_URL) {
      nextAuthUrl = `https://${process.env.VERCEL_URL}`;
      console.log(`✅ Using Vercel URL: ${nextAuthUrl}`);
    } else if (process.env.RAILWAY_PUBLIC_DOMAIN) {
      nextAuthUrl = `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;
      console.log(`✅ Using Railway domain: ${nextAuthUrl}`);
    } else if (process.env.RENDER_EXTERNAL_URL) {
      nextAuthUrl = process.env.RENDER_EXTERNAL_URL;
      console.log(`✅ Using Render URL: ${nextAuthUrl}`);
    } else if (process.env.NETLIFY_URL) {
      nextAuthUrl = process.env.NETLIFY_URL;
      console.log(`✅ Using Netlify URL: ${nextAuthUrl}`);
    } else if (process.env.REPLIT_DEPLOYMENT_URL) {
      nextAuthUrl = process.env.REPLIT_DEPLOYMENT_URL;
      console.log(`✅ Using Replit deployment URL: ${nextAuthUrl}`);
    } else if (process.env.REPL_SLUG && process.env.REPL_OWNER) {
      nextAuthUrl = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
      console.log(`✅ Using Replit domain: ${nextAuthUrl}`);
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
  
  console.log('📊 Platform Environment Info:', detectedPlatform.info);
  
  const config: DeploymentConfig = {
    environment,
    nextAuthUrl,
    mongodbUri,
    port,
    platform: detectedPlatform,
  };
  
  console.log('✅ Deployment configuration validated successfully');
  console.log('=== END DEPLOYMENT VALIDATION ===');
  
  return config;
}

// Export a validated config instance
export const deploymentConfig = validateDeploymentConfig();