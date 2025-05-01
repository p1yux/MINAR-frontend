/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,

    async rewrites() {
        const development = process.env.NEXT_PUBLIC_ENV === "development";
        const BASEURL = development
            ? process.env.NEXT_PUBLIC_DEV_URL
            : process.env.NEXT_PUBLIC_PROD_URL;
        return [
            {
                source: "/api/:path*/",
                destination: `${BASEURL}/api/:path*/`, // Proxy to the appropriate URL based on the environment
            },
        ];
    },
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
