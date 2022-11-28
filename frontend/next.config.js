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
    REACT_APP_YANDEX_METRIKA_ID: process.env.REACT_APP_YANDEX_METRIKA_ID,
  },
  i18n: {
    locales: ['ru'],
    defaultLocale: 'ru',
  },
  images: {
    domains: ['nestjs'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://nestjs:4200/api/:path*',
      },
      {
        source: '/uploads/:path*',
        destination: 'http://nestjs:4200/uploads/:path*',
      },
    ]
  },
}

module.exports = nextConfig
