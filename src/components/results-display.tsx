"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, Copy, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import ReactMarkdown from "react-markdown"
import { VideoSummary } from "@/types/video"

interface ResultsDisplayProps {
  isProcessing?: boolean
  videoData?: VideoSummary | null
  error?: string | null
}

export default function ResultsDisplay({ isProcessing, videoData, error }: ResultsDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyMarkdown = async () => {
    if (videoData?.resume) {
      try {
        await navigator.clipboard.writeText(videoData.resume)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy text: ", err)
      }
    }
  }

  // Show loading state
  if (isProcessing) {
    return (
      <Card className="shadow-lg border-0 bg-white">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-500 border-t-transparent mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Processing Video...</h3>
              <p className="text-gray-600">Please wait while we generate your resume</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Show error state
  if (error) {
    return (
      <Card className="shadow-lg border-0 bg-white border-red-200">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="text-red-500">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Processing Failed</h3>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Show results
  if (videoData) {
    return (
      <Card className="shadow-lg border-0 bg-white" data-results-display="true">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-xl">{videoData.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-gray-600">                        <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Duration: {videoData.duration} min
              </div>
              <Badge variant="secondary" className="text-xs">
                ID: {videoData.video_id}
              </Badge>
            </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyMarkdown}
              className="ml-4"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Markdown
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="prose prose-gray max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-2xl font-bold text-gray-900 mb-4">{children}</h1>,
                h2: ({ children }) => (
                  <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-medium text-gray-700 mb-2 mt-4">{children}</h3>
                ),
                p: ({ children }) => <p className="text-gray-600 mb-3 leading-relaxed">{children}</p>,
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-1 mb-4 text-gray-600">{children}</ul>
                ),
                li: ({ children }) => <li className="ml-2">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold text-gray-800">{children}</strong>,
                code: ({ children }) => (
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{children}</code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>
                ),
              }}
            >
              {videoData.resume}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Return null if no data to show
  return null
}
