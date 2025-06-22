import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { video_url } = await request.json()
    
    if (!video_url) {
      return NextResponse.json({ error: 'video_url is required' }, { status: 400 })
    }

    const backendUrl = process.env.BACKEND_API_URL
    const apiKey = process.env.API_KEY
    
    if (!backendUrl) {
      console.error("BACKEND_API_URL environment variable is not set")
      return NextResponse.json({ error: 'Backend configuration error' }, { status: 500 })
    }

    if (!apiKey) {
      console.error("API_KEY environment variable is not set")
      return NextResponse.json({ error: 'Authentication configuration error' }, { status: 500 })
    }

    // Forward request to actual backend
    const response = await fetch(`${backendUrl}/youtube-video/resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ video_url }),
    })

    if (!response.ok) {
      throw new Error(`Backend HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    // Return the data in the expected format
    return NextResponse.json({
      id: data.id || "unknown",
      title: data.title || "Video Summary", 
      duration: data.duration || "Unknown",
      resume: data.resume || "Summary not available"
    })
    
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
