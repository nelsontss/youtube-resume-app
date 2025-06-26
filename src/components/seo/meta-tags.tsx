import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  noIndex?: boolean
}

export function generateSEOMetadata({
  title = 'VideoSummarizer - AI YouTube Video Summarizer',
  description = 'Free AI-powered tool to summarize YouTube videos quickly and easily. Get key insights from any YouTube video in seconds with our advanced AI technology.',
  keywords = [
    'youtube summarizer',
    'video summary',
    'ai video analysis',
    'youtube transcript',
    'video insights',
    'ai summarization',
    'video content analysis',
    'youtube tools'
  ],
  canonical = '/',
  ogImage,
  noIndex = false
}: SEOProps = {}): Metadata {
  const baseUrl = process.env.APP_URL || 'http://localhost:3000'
  const fullCanonical = canonical.startsWith('http') ? canonical : `${baseUrl}${canonical}`
  const defaultOgImage = `${baseUrl}/og-image.png`

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'VideoSummarizer Team' }],
    creator: 'VideoSummarizer',
    publisher: 'VideoSummarizer',
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: fullCanonical,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: fullCanonical,
      siteName: 'VideoSummarizer',
      images: [
        {
          url: ogImage || defaultOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@nelsontss_en',
      creatorId: '1467726470533754880',
      site: '@nelsontss_en',
      images: [ogImage || defaultOgImage],
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    },
    verification: {
      // Add Google Search Console verification here when ready
      // google: 'your-google-site-verification-code',
    },
    other: {
      'application-name': 'VideoSummarizer',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': 'VideoSummarizer',
      'msapplication-TileColor': '#ef4444',
      'theme-color': '#ef4444',
    }
  }
}
