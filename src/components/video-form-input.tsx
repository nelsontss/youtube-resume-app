"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap } from "lucide-react"
import ErrorModal from "@/components/error-modal"
import { LoadingBar } from "@/components/loading-bar"
import { useVideoContext } from "@/contexts/video-context"

interface VideoFormProps {
  adsEnabled?: boolean // Optional prop - defaults to false for safety
}

export default function VideoForm({ adsEnabled = false }: VideoFormProps) {
  const { 
    url, 
    setUrl, 
    isProcessing, 
    setIsProcessing, 
    setVideoData, 
    setError 
  } = useVideoContext()
  
  const [showRealButton, setShowRealButton] = useState(false)
  const [errorModal, setErrorModal] = useState<{
    isOpen: boolean
    errorType: 'duration_limit' | 'server_error' | 'unknown'
    maxAllowedDuration?: string
    message?: string
  }>({
    isOpen: false,
    errorType: 'unknown'
  })

  const handleShadowButtonClick = () => {
    if (adsEnabled) {
      // Open ad link in new tab only if ads are enabled
      window.open('https://www.profitableratecpm.com/ikjk0fmkkr?key=8a1f4a7e92e52d02e33ef283f2edb368', '_blank')
      // Show real button after a short delay
      setTimeout(() => {
        setShowRealButton(true)
      }, 500)
    } else {
      // If ads are disabled, show real button immediately
      setShowRealButton(true)
    }
  }

  const closeErrorModal = () => {
    setErrorModal({ ...errorModal, isOpen: false })
    setError(null)
  }

  // Error type mapping for scalable error handling
  interface ErrorData {
    error_type: string
    message: string
    max_allowed_duration?: string
    error?: string
  }
  
  const errorTypeMap: Record<string, (errorData: ErrorData) => typeof errorModal> = {
    duration_limit: (errorData) => ({
      isOpen: true,
      errorType: 'duration_limit',
      maxAllowedDuration: errorData.max_allowed_duration,
      message: errorData.message
    }),
    server_error: (errorData) => ({
      isOpen: true,
      errorType: 'server_error',
      message: errorData.message
    }),
    default: (errorData) => ({
      isOpen: true,
      errorType: 'unknown',
      message: errorData.message || errorData.error || 'Failed to summarize video'
    })
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
        
        // Handle errors using scalable error type mapping
        const errorHandler = errorTypeMap[errorData.error_type] || errorTypeMap.default
        setErrorModal(errorHandler(errorData))
        return
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
      setShowRealButton(false) // Reset button state after processing
    }
  }

  return (
    <div className="space-y-8">
      {/* Error Modal */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={closeErrorModal}
        errorType={errorModal.errorType}
        maxAllowedDuration={errorModal.maxAllowedDuration}
        message={errorModal.message}
      />

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
          </form>
        </CardContent>
      </Card>
      
      {/* Loading Bar */}
      {isProcessing && (
        <LoadingBar
          isLoading={isProcessing}
          title="Analyzing YouTube Video"
          subtitle="Our AI is processing the content and generating your markdown summary"
        />
      )}
    </div>
  )
}
