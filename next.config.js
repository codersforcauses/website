const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  future: { webpack5: true },
  experimental: {
    optimizeCss: true,
    optimizeFonts: true,
    optimizeImages: true
  }
})
