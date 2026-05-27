const path = require('path')
module.exports = {
  reactStrictMode: true,
  distDir: '../.next',
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'midori02.com',
      },
      {
        protocol: 'https',
        hostname: 'www.midori02.com',
      },
    ],
  },
}
