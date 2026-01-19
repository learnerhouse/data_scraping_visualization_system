/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  
  basePath: process.env.NODE_ENV === 'production' ? '/data_scraping_visualization_system' : '',
  
  images: {
    unoptimized: true,
  },
  
  typescript: {
    ignoreBuildErrors: false,
  },
  
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
