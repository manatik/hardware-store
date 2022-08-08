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
  },
}

module.exports = nextConfig
