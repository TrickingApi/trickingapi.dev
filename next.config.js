/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.trickingapi.dev/:path*',
      },
    ]
  },
  transpilePackages: ['react-syntax-highlighter', 'swagger-client', 'swagger-ui-react'],
}

module.exports = nextConfig
