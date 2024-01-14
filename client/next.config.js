/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/project/approve',
        destination: '/project',
        has: [{type: 'query', key: 'project'}]

      },
      {
        source: '/project/approve',
        destination: '/project',
        has: [{type: 'query', key: 'project'}]
      },
      {
        source: '/',
        destination: '/login'
      }
    ]
  }
};

module.exports = nextConfig;
