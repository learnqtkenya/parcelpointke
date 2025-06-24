/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  images: {
    unoptimized: true,
  },
  
  basePath: '',
  assetPrefix: '',
  
  compress: true,
  
  poweredByHeader: false,

}

module.exports = nextConfig