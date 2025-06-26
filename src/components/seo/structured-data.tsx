import { WebApplication, WithContext } from 'schema-dts'

interface StructuredDataProps {
  type: 'website' | 'webapp' | 'summary'
  _data?: Record<string, unknown>
}

export default function StructuredData({ type }: StructuredDataProps) {
  const baseUrl = process.env.APP_URL || 'http://localhost:3000'

  const getStructuredData = (): WithContext<WebApplication> => {
    switch (type) {
      case 'website':
      case 'webapp':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'VideoSummarizer - AI YouTube Video Summarizer',
          description: 'Free AI-powered tool to summarize YouTube videos quickly and easily. Get key insights from any YouTube video in seconds.',
          url: baseUrl,
          applicationCategory: 'Multimedia',
          operatingSystem: 'All',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          featureList: [
            'AI-powered video summarization',
            'YouTube video analysis',
            'Key insights extraction',
            'Free to use',
          ],
          creator: {
            '@type': 'Organization',
            name: 'VideoSummarizer',
            url: baseUrl,
          },
          keywords: [
            'youtube summarizer',
            'video summary',
            'ai video analysis',
            'youtube transcript',
            'video insights',
          ],
        }
      
      default:
        return {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'VideoSummarizer',
          description: 'AI-powered YouTube video summarizer',
          url: baseUrl,
        }
    }
  }

  const structuredData = getStructuredData()

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
