"use client"

import React from "react"
import { useEffect, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Zap } from "lucide-react"

interface LoadingBarProps {
  isLoading: boolean
  onComplete?: () => void
  title?: string
  subtitle?: string
}

export function LoadingBar({
  isLoading,
  onComplete,
  title = "Processing your video...",
  subtitle = "Our AI is analyzing the content and generating your summary",
}: LoadingBarProps) {
  const [progress, setProgress] = useState(0)
  const [currentStage, setCurrentStage] = useState("")
  const [isCompleting, setIsCompleting] = useState(false)

  const stages = [
    { threshold: 10, message: "Fetching video data..." },
    { threshold: 25, message: "Extracting audio transcript..." },
    { threshold: 45, message: "Analyzing content structure..." },
    { threshold: 65, message: "Identifying key topics..." },
    { threshold: 80, message: "Generating summary..." },
    { threshold: 92, message: "Formatting markdown..." },
    { threshold: 98, message: "Finalizing output..." },
    { threshold: 100, message: "Complete!" },
  ]

  const updateStage = useCallback(
    (currentProgress: number) => {
      const stage = stages.find((s) => currentProgress <= s.threshold)
      if (stage && stage.message !== currentStage) {
        setCurrentStage(stage.message)
      }
    },
    [currentStage, stages],
  )

  const exponentialProgress = useCallback(() => {
    setProgress((prev) => {
      let increment

      // Exponential backoff - slower as we get closer to 100%
      if (prev < 20) {
        increment = Math.random() * 8 + 2 // 2-10% increments
      } else if (prev < 50) {
        increment = Math.random() * 4 + 1 // 1-5% increments
      } else if (prev < 75) {
        increment = Math.random() * 2 + 0.5 // 0.5-2.5% increments
      } else if (prev < 90) {
        increment = Math.random() * 1 + 0.2 // 0.2-1.2% increments
      } else if (prev < 98) {
        increment = Math.random() * 0.3 + 0.1 // 0.1-0.4% increments
      } else {
        increment = 0 // Stop at 98% until actual completion
      }

      const newProgress = Math.min(prev + increment, 98)
      return newProgress
    })
  }, [])

  const getProgressDelay = useCallback((currentProgress: number) => {
    // Exponential backoff for timing - longer delays as progress increases
    if (currentProgress < 20) return 150 + Math.random() * 100 // 150-250ms
    if (currentProgress < 50) return 300 + Math.random() * 200 // 300-500ms
    if (currentProgress < 75) return 600 + Math.random() * 400 // 600-1000ms
    if (currentProgress < 90) return 1000 + Math.random() * 500 // 1000-1500ms
    return 2000 + Math.random() * 1000 // 2000-3000ms
  }, [])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (isLoading && !isCompleting) {
      const scheduleNext = () => {
        timeoutId = setTimeout(() => {
          exponentialProgress()
          setProgress((current) => {
            updateStage(current)
            if (current < 98) {
              scheduleNext()
            }
            return current
          })
        }, getProgressDelay(progress))
      }

      if (progress === 0) {
        // Start immediately
        exponentialProgress()
        scheduleNext()
      } else if (progress < 98) {
        scheduleNext()
      }
    }

    // Complete when isLoading becomes false
    if (!isLoading && progress > 0 && progress < 100 && !isCompleting) {
      setIsCompleting(true)
      setCurrentStage("Complete!")

      // Smooth completion animation
      const completeAnimation = () => {
        setProgress((prev) => {
          const newProgress = Math.min(prev + 2, 100)
          if (newProgress < 100) {
            setTimeout(completeAnimation, 50)
          } else {
            setTimeout(() => {
              onComplete?.()
            }, 500)
          }
          return newProgress
        })
      }
      completeAnimation()
    }

    // Reset when not loading
    if (!isLoading && progress === 0) {
      setCurrentStage("")
      setIsCompleting(false)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isLoading, progress, exponentialProgress, getProgressDelay, updateStage, onComplete, isCompleting])

  // Reset progress when starting fresh
  useEffect(() => {
    if (isLoading && progress === 0) {
      setCurrentStage(stages[0].message)
      setIsCompleting(false)
    }
  }, [isLoading, progress, stages])

  if (!isLoading && progress === 0) {
    return null
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-0 bg-gradient-to-r from-red-50 to-orange-50">
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              {progress < 100 ? (
                <Sparkles className="w-6 h-6 text-red-500 animate-pulse" />
              ) : (
                <Zap className="w-6 h-6 text-green-500" />
              )}
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            </div>
            <p className="text-gray-600">{subtitle}</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-3">
            <Progress value={progress} className="h-3 bg-gray-200" />

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 font-medium">{currentStage}</span>
              <span className="text-gray-800 font-semibold">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Visual Indicators */}
          <div className="flex items-center justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  progress > 0 ? "bg-red-400 animate-pulse" : "bg-gray-300"
                }`}
                style={{
                  animationDelay: `${i * 200}ms`,
                }}
              />
            ))}
          </div>

          {/* Completion Message */}
          {progress === 100 && (
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <Zap className="w-5 h-5" />
                <span className="font-medium">Summary generated successfully!</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
