"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { VideoSummary } from "@/types/video"

interface VideoContextType {
  url: string
  setUrl: (url: string) => void
  isProcessing: boolean
  setIsProcessing: (processing: boolean) => void
  videoData: VideoSummary | null
  setVideoData: (data: VideoSummary | null) => void
  error: string | null
  setError: (error: string | null) => void
}

const VideoContext = createContext<VideoContextType | undefined>(undefined)

export const useVideoContext = () => {
  const context = useContext(VideoContext)
  if (!context) {
    throw new Error('useVideoContext must be used within a VideoProvider')
  }
  return context
}

interface VideoProviderProps {
  children: ReactNode
}

export const VideoProvider: React.FC<VideoProviderProps> = ({ children }) => {
  const [url, setUrl] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [videoData, setVideoData] = useState<VideoSummary | null>(null)
  const [error, setError] = useState<string | null>(null)

  const value: VideoContextType = {
    url,
    setUrl,
    isProcessing,
    setIsProcessing,
    videoData,
    setVideoData,
    error,
    setError,
  }

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  )
}
