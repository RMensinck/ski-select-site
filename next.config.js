/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'nl', 'ja', 'fr', 'de', 'es', 'pl'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
