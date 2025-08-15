/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  env: {
    PORT: process.env.PORT || "3000",
    // Platform-agnostic NEXTAUTH_URL with fallbacks for major hosting providers
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` :
      process.env.RAILWAY_PUBLIC_DOMAIN ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` :
      process.env.RENDER_EXTERNAL_URL ? process.env.RENDER_EXTERNAL_URL :
      process.env.REPLIT_DEPLOYMENT_URL ? process.env.REPLIT_DEPLOYMENT_URL :
      process.env.REPL_SLUG ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co` :
      'http://localhost:3000'
  },
  // Platform-agnostic deployment configuration
  experimental: {},
  // Ensure proper headers for deployment
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig