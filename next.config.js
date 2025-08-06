/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  env: {
    PORT: process.env.PORT || "3000"
  }
}

module.exports = nextConfig