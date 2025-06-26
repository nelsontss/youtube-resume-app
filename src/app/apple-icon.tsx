import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'
 
export default function AppleIcon() {
  // Get the base URL for absolute image paths
  const baseUrl = process.env.APP_URL || 'http://localhost:3000'
  
  return new ImageResponse(
    (
      <div
        style={{
          background: '#ffffff',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20px',
          padding: '16px',
        }}
      >
        <img
          src={`${baseUrl}/logo.png`}
          alt="Logo"
          width="148"
          height="148"
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
