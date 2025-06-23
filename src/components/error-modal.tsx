"use client"

import React from "react"
import { AlertTriangle, Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorModalProps {
  isOpen: boolean
  onClose: () => void
  errorType: 'duration_limit' | 'server_error' | 'unknown'
  maxAllowedDuration?: string
  message?: string
}

export default function ErrorModal(props: ErrorModalProps) {
  if (!props.isOpen) return null

  const formatDuration = (duration: string) => {
    if (duration === 'unknown') return 'unknown'
    
    // Convert seconds to minutes if it's a number
    const seconds = parseInt(duration)
    if (!isNaN(seconds)) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }
    
    return duration
  }

  const renderDurationLimitError = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-center">
        <div className="p-4 bg-orange-100 rounded-full">
          <Clock className="w-12 h-12 text-orange-600" />
        </div>
      </div>
      
      <div className="text-center space-y-3">
        <h3 className="text-xl font-bold text-gray-900">Video Too Long</h3>
        <p className="text-gray-600 leading-relaxed">
          We&apos;re sorry, but this video exceeds our processing limit. Our AI can currently handle videos up to{" "}
          <span className="font-semibold text-orange-600">
            {formatDuration(props.maxAllowedDuration || 'unknown')} minutes
          </span>{" "}
          in length.
        </p>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
          <div className="space-y-2">
            <h4 className="font-medium text-orange-800">What you can do:</h4>
            <ul className="text-sm text-orange-700 space-y-1 list-disc list-inside">
              <li>Try a shorter video segment</li>
              <li>Look for highlight clips or summaries of the content</li>
              <li>Check back later - we&apos;re working on supporting longer videos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

  const renderServerError = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-center">
        <div className="p-4 bg-red-100 rounded-full">
          <AlertTriangle className="w-12 h-12 text-red-600" />
        </div>
      </div>
      
      <div className="text-center space-y-3">
        <h3 className="text-xl font-bold text-gray-900">Server Error</h3>
        <p className="text-gray-600 leading-relaxed">
          We&apos;re experiencing technical difficulties. Please try again in a few moments.
        </p>
        {props.message && (
          <p className="text-sm text-gray-500 italic">{props.message}</p>
        )}
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
          <div className="space-y-2">
            <h4 className="font-medium text-red-800">If the problem persists:</h4>
            <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
              <li>Check your internet connection</li>
              <li>Try with a different video</li>
              <li>Contact support if the issue continues</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

  const renderGenericError = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-center">
        <div className="p-4 bg-gray-100 rounded-full">
          <AlertTriangle className="w-12 h-12 text-gray-600" />
        </div>
      </div>
      
      <div className="text-center space-y-3">
        <h3 className="text-xl font-bold text-gray-900">Something Went Wrong</h3>
        <p className="text-gray-600 leading-relaxed">
          {props.message || "An unexpected error occurred. Please try again."}
        </p>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md mx-auto shadow-2xl">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8"
            onClick={() => props.onClose()}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="sr-only">Error</CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0 pb-6">
          {props.errorType === 'duration_limit' && renderDurationLimitError()}
          {props.errorType === 'server_error' && renderServerError()}
          {props.errorType === 'unknown' && renderGenericError()}
          
          <div className="flex justify-center mt-6">
            <Button onClick={() => props.onClose()} className="px-8">
              Got it
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
