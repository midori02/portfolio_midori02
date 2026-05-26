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
    domains: ['firebasestorage.googleapis.com', 'midori02.com'],
  },
}
