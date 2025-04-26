/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'encrypted-tbn3.gstatic.com',
      'encrypted-tbn2.gstatic.com',
      'encrypted-tbn1.gstatic.com',
      'encrypted-tbn0.gstatic.com',
      'images.etsy.com',
      'www.etsy.com',
      'i.etsystatic.com',
      'm.media-amazon.com',
      'assets.myntassets.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ]
  }
};

export default nextConfig;
