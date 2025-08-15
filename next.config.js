/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  env: {
    PORT: process.env.PORT || "3000",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || process.env.REPLIT_DEPLOYMENT_URL || process.env.REPL_SLUG ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co` : 'http://localhost:3000'
  },
  // Cloud Run deployment configuration
  experimental: {
    // Note: logging.fetches removed as it's not supported in this Next.js version
  },
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