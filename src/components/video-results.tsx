"use client"

import React from "react"
import ResultsDisplay from "@/components/results-display"
import { useVideoContext } from "@/contexts/video-context"

export default function VideoResults() {
  const { isProcessing, videoData, error } = useVideoContext()

  return (
    <ResultsDisplay 
      isProcessing={isProcessing}
      videoData={videoData}
      error={error}
    />
  )
}
