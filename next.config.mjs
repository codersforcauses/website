/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  swcMinify: true,
  // reactStrictMode: true,  // disabled for now due to it breaking headless-ui
  experimental: {
    optimizeCss: true
  }
}

export default nextConfig
