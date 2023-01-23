const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.trickingapi.dev/:path*',
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: 'https://docs.trickingapi.dev',
        permanent: true
      }
    ]
  },
  transpilePackages: ['react-syntax-highlighter', 'swagger-client', 'swagger-ui-react'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
