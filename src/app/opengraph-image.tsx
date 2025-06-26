import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'VideoSummarizer - AI YouTube Video Summarizer'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  // Get the base URL for absolute image paths
  const baseUrl = process.env.APP_URL || 'http://localhost:3000'
  
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        }}
      >
        {/* Logo/Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            width: '120px',
            height: '120px',
            marginBottom: '32px',
            border: '2px solid #ef4444',
            padding: '16px',
          }}
        >
          <img
            src={`${baseUrl}/logo.png`}
            alt="Logo"
            width="88"
            height="88"
            style={{
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '60px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          VideoSummarizer
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '32px',
            color: '#64748b',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.2,
          }}
        >
          AI-Powered YouTube Video Summarizer
        </div>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '24px',
            marginTop: '32px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f1f5f9',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '20px',
              color: '#475569',
            }}
          >
            🤖 AI-Powered
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f1f5f9',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '20px',
              color: '#475569',
            }}
          >
            ⚡ Fast & Free
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f1f5f9',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '20px',
              color: '#475569',
            }}
          >
            🎯 Key Insights
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
