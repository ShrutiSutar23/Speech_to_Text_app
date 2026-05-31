import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://speech-to-text-backend-f19n.onrender.com/:path*'
      }
    ]
  }
}

export default nextConfig