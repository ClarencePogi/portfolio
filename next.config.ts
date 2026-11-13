import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: '/api/image/**' },   // omit "search" to allow any query string
      { pathname: '/images/**' },
    ],
    // only if you use remote URLs:
    // remotePatterns: [{ protocol: 'https', hostname: 'your-image-host.com' }],
    // only if you pass a custom quality, e.g. quality={90}:
    // qualities: [75, 90],
  },
}

export default nextConfig