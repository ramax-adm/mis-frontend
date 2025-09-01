/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  api: {
    bodyParser: {
      sizeLimit: '50mb', // ou maior
    },
  },
  images: { unoptimized: true },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
