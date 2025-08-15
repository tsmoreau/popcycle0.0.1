/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  env: {
    PORT: process.env.PORT || "3000",
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