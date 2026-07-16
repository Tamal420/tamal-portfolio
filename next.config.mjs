/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development warnings
  reactStrictMode: true,

  // Tree-shake heavy barrels so framer-motion isn't pulled in wholesale
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },

  // Optimise images — allow external sources if needed later
  images: {
    formats: ['image/avif', 'image/webp'],
    // Add your domain here once deployed
    // domains: ['tamalsaha.dev'],
  },

  // Security headers
  async headers() {
    const contentSecurityPolicy = [
      "default-src 'self'",
      // Next.js requires inline/eval scripts without a nonce middleware setup
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Framer Motion + Tailwind inject inline styles
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      'upgrade-insecure-requests',
    ].join('; ')

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
