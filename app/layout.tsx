import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

// ─── Fonts ───────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
})

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://tamalsaha.dev'),

  title: {
    default: 'Tamal Saha — Associate SQA Engineer | Manual, API & SaaS Testing | Dhaka',
    template: '%s | Tamal Saha — QA Engineer',
  },

  description:
    'Associate SQA Engineer at Kaz Software with experience in manual testing, API testing, RBAC validation, and healthcare SaaS QA across web and mobile platforms. Currently learning Playwright automation.',

  keywords: [
    'SQA Engineer',
    'Manual Testing',
    'API Testing',
    'Healthcare SaaS QA',
    'RBAC Testing',
    'Regression Testing',
    'Postman',
    'BrowserStack',
    'Playwright',
    'Python automation',
    'Kaz Software',
    'Dhaka QA engineer',
    'Mobile testing',
    'EVV testing',
    'WebEVV',
  ],

  authors: [{ name: 'Tamal Saha', url: 'https://tamalsaha.dev' }],

  creator: 'Tamal Saha',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tamalsaha.dev',
    siteName: 'Tamal Saha — QA Engineer Portfolio',
    title: 'Tamal Saha · QA Engineer Portfolio',
    description:
      'Manual testing, API testing, and healthcare SaaS QA across web and mobile platforms. Based in Dhaka. Open to new opportunities.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tamal Saha — Associate SQA Engineer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Tamal Saha · QA Engineer Portfolio',
    description:
      'Manual testing, API testing, and healthcare SaaS QA. Based in Dhaka. Open to new opportunities.',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

// ─── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans bg-base text-ink-primary antialiased">
        {children}
      </body>
    </html>
  )
}
