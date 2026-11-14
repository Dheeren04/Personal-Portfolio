import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/content/site';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { Cursor } from '@/components/layout/Cursor';

const serifFont = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const sansFont = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#F3EDE3',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.meta.siteUrl),
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
  authors: [{ name: siteConfig.name, url: siteConfig.meta.siteUrl }],
  creator: siteConfig.name,
  keywords: [
    'Dheeren',
    'Data Science',
    'Data Analyst',
    'SQL',
    'Python',
    'Bangalore',
    'Portfolio',
    'Undergraduate',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.meta.siteUrl,
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/images/hero-photo.jpg',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.role}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    images: ['/images/hero-photo.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.meta.siteUrl,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangalore',
      addressCountry: 'IN',
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: siteConfig.education.items[0].institution,
      },
      {
        '@type': 'EducationalOrganization',
        name: siteConfig.education.items[1].institution,
      },
      {
        '@type': 'EducationalOrganization',
        name: siteConfig.education.items[2].institution,
      },
    ],
    sameAs: [
      siteConfig.urls.linkedin,
      siteConfig.urls.existingPortfolio,
      ...(siteConfig.urls.github ? [siteConfig.urls.github] : []),
    ],
  };

  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} ${monoFont.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-accent selection:text-white">
        <div className="grain-overlay" aria-hidden="true" />
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

