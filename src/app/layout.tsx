import type { Metadata, Viewport } from 'next';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './globals.css';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';

import {
  OG_IMAGE,
  organizationLd,
  routeMeta,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  websiteLd,
} from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: routeMeta['/'].title,
  description: routeMeta['/'].description,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_PK',
    url: `${SITE_URL}/`,
    title: routeMeta['/'].title,
    description: routeMeta['/'].description,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${routeMeta['/'].title} — ${SITE_NAME}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: routeMeta['/'].title,
    description: routeMeta['/'].description,
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  verification: {
    google: 'z7RcvZfXCqDcXgp7qwPlg7Dk6W79IDrg3CxDLFRXiHA',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f3d2e',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK">
      <body>
        <JsonLd data={[organizationLd, websiteLd]} />
        <div
          className="relative flex min-h-screen flex-col overflow-hidden font-open-sans"
          style={{ fontFamily: '"Open Sans", serif' }}
        >
          <div className="grid-pattern" />
          <div className="grid-squares" />
          <Header />

          <main className="relative z-10 mx-auto w-full max-w-7xl flex-grow px-4 py-12 sm:px-6 lg:px-8">
            {children}
          </main>

          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
