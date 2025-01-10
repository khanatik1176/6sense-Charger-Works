/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['pattern50.s3.amazonaws.com'],
  },
};

module.exports = nextConfig;
