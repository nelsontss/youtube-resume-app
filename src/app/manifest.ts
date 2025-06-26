import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VideoSummarizer - AI YouTube Video Summarizer',
    short_name: 'VideoSummarizer',
    description: 'Free AI-powered tool to summarize YouTube videos quickly and easily',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ef4444',
    icons: [
      {
        src: '/icon?size=192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon?size=512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['productivity', 'education', 'multimedia'],
    screenshots: [
      {
        src: '/screenshot-wide.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'VideoSummarizer Interface'
      },
      {
        src: '/screenshot-narrow.png',
        sizes: '750x1334',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'VideoSummarizer Mobile Interface'
      }
    ]
  }
}
