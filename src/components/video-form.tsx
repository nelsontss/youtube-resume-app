"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap } from "lucide-react"
import ResultsDisplay from "@/components/results-display"
import { VideoSummary } from "@/types/video"
import { LoadingBar } from "./loading-bar"

export default function VideoForm() {
  const [url, setUrl] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [videoData, setVideoData] = useState<VideoSummary | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showRealButton, setShowRealButton] = useState(false)

  const handleShadowButtonClick = () => {
    // Open ad link in new tab
    window.open('https://www.profitableratecpm.com/ikjk0fmkkr?key=8a1f4a7e92e52d02e33ef283f2edb368', '_blank')
    // Show real button after a short delay
    setTimeout(() => {
      setShowRealButton(true)
    }, 500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setIsProcessing(true)
    setError(null)
    setVideoData(null)

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video_url: url }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to summarize video')
      }

      const result = await response.json()
      
      if (result) {
        setVideoData(result)
      } else {
        setError("Failed to summarize video. Please try again.")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to summarize video. Please try again.")
      console.error("Error:", err)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-red-500" />
            Enter YouTube URL
          </CardTitle>
          <CardDescription>
            Paste any YouTube video URL to generate a comprehensive markdown summary
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="flex-1 h-12 text-base"
                required
                disabled={isProcessing}
              />
              {!showRealButton ? (
                <Button
                  type="button"
                  onClick={handleShadowButtonClick}
                  className="h-12 px-8 bg-red-500 hover:bg-red-600"
                  disabled={!url.trim()}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Summarize
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="h-12 px-8 bg-red-500 hover:bg-red-600"
                  disabled={isProcessing || !url.trim()}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Summarize
                    </>
                  )}
                </Button>
              )}
            </div>
            {error && (
              <div className="text-red-600 text-sm mt-2">
                {error}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
      {/* Loading Bar */}
        {isProcessing && <LoadingBar
          isLoading={isProcessing}
          title="Analyzing YouTube Video"
          subtitle="Our AI is processing the content and generating your markdown summary"
        />}
      {/* Results Section */}
      <ResultsDisplay 
        isProcessing={isProcessing}
        videoData={videoData}
        error={error}
      />
    </div>
  )
}
