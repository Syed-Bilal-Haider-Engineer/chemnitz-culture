import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // Proxy to Express server
      },
      {
        source: '/.well-known/appspecific/com.chrome.devtools.json',
        destination: '/404', // Or stub JSON if you want
      },
    ];
  },
};

export default nextConfig;
