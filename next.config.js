/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  webpack: (config, { isServer }) => {
    // Force Next.js to use Babel instead of SWC
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      use: 'babel-loader',
    });
    return config;
  }
}

module.exports = nextConfig