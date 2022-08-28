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
    API_SSR_BASE_URL: process.env.API_SSR_BASE_URL,
  },
}

module.exports = nextConfig
