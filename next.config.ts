import type { NextConfig } from 'next'
import { LEGACY_REDIRECTS } from './src/lib/legacy-routes'

// Importé pour son effet de bord : une variable d’environnement manquante fait échouer le build.
import './src/lib/env'

const CONTENT_SECURITY_POLICY = ["frame-ancestors 'none'", "base-uri 'self'", "form-action 'self'"].join(
  '; ',
)

const PERMISSIONS_POLICY = [
  'accelerometer=()',
  'camera=()',
  'geolocation=()',
  'gyroscope=()',
  'magnetometer=()',
  'microphone=()',
  'payment=()',
  'usb=()',
].join(', ')

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Content-Security-Policy', value: CONTENT_SECURITY_POLICY },
          { key: 'Permissions-Policy', value: PERMISSIONS_POLICY },
        ],
      },
    ]
  },

  async redirects() {
    // `statusCode: 301` et non `permanent: true`, qui produirait un 308.
    return LEGACY_REDIRECTS.map(({ source, destination }) => ({
      source,
      destination,
      statusCode: 301 as const,
    }))
  },
}

export default nextConfig
