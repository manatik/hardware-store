/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  productionBrowserSourceMaps: process.env.ENVIRONMENT === 'review',
  /**
   * Публичный конфиг, доступный на фронте
   */
  publicRuntimeConfig: {
    REACT_APP_ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://nestjs:4200/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig
