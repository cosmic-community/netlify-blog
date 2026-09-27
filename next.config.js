/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet, noimageindex',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' http://localhost:3040 http://localhost:3000 http://127.0.0.1:3040 https://app.cosmicjs.com https://*.cosmicjs.com",
          },
        ],
      },
    ]
  },
  reactStrictMode: true,
}

module.exports = nextConfig