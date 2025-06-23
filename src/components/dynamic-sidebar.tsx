"use client"
import React, { useState, useEffect, useRef } from 'react'
import Banner from '@/components/banner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap, FileText, Sparkles } from 'lucide-react'

const BANNER_HEIGHT = 250 + 24 // Banner height + margin
const FEATURES_CARD_HEIGHT = 280 // Approximate height of features card

const bannerConfigs = [
  { key: 'd342950369c684af192e3b3c81921af8', height: 250, width: 300 },
  { key: 'd342950369c684af192e3b3c81921af8', height: 250, width: 300 },
  { key: 'd342950369c684af192e3b3c81921af8', height: 250, width: 300 },
  { key: 'd342950369c684af192e3b3c81921af8', height: 250, width: 300 },
]

export default function DynamicSidebar() {
  const [visibleBanners, setVisibleBanners] = useState(1)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const mainContentRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const calculateVisibleBanners = () => {
      if (!sidebarRef.current) return

      const viewportHeight = window.innerHeight
      const sidebarTop = sidebarRef.current.getBoundingClientRect().top
      const availableHeight = viewportHeight - sidebarTop - 100 // 100px buffer

      // Calculate how many banners can fit
      const spaceForBanners = availableHeight - FEATURES_CARD_HEIGHT
      const maxBanners = Math.floor(spaceForBanners / BANNER_HEIGHT)
      
      // Ensure at least 1 banner and don't exceed available configs
      const bannersToShow = Math.max(1, Math.min(maxBanners, bannerConfigs.length))
      
      setVisibleBanners(bannersToShow)
    }

    // Find the main content area to observe
    mainContentRef.current = document.querySelector('main') || document.querySelector('.lg\\:col-span-3')

    // Calculate on mount
    calculateVisibleBanners()

    // Set up ResizeObserver to watch for content changes
    const resizeObserver = new ResizeObserver(() => {
      // Use requestAnimationFrame to avoid performance issues
      requestAnimationFrame(calculateVisibleBanners)
    })

    // Observe the main content area and specific elements that might expand
    if (mainContentRef.current) {
      resizeObserver.observe(mainContentRef.current)
    }
    
    // Also observe the results display area specifically
    const resultsArea = document.querySelector('[data-results-display]') || 
                       document.querySelector('.space-y-8') ||
                       document.body
    
    if (resultsArea) {
      resizeObserver.observe(resultsArea)
    }

    // Set up a MutationObserver to watch for DOM changes (new elements added)
    const mutationObserver = new MutationObserver(() => {
      // Delay calculation to allow DOM to settle
      setTimeout(calculateVisibleBanners, 100)
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    })

    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return (
    <div ref={sidebarRef} className="lg:col-span-1 space-y-6 w-[300px]">
      {/* Dynamic Banners */}
      {bannerConfigs.slice(0, visibleBanners).map((config, index) => (
        <div key={`banner-${index}`} className="banner-container">
          <Banner 
            bannerKey={config.key} 
            height={config.height} 
            width={config.width} 
          />
        </div>
      ))}
      
      {/* Features Card */}
      <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
        <CardHeader>
          <CardTitle className="text-lg text-red-800">Why Use VideoSummarizer?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-red-100 rounded">
              <Zap className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <div className="font-medium text-red-800">Lightning Fast</div>
              <div className="text-sm text-red-600">Get summaries in seconds</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-1 bg-red-100 rounded">
              <FileText className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <div className="font-medium text-red-800">Markdown Format</div>
              <div className="text-sm text-red-600">Clean, structured output</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-1 bg-red-100 rounded">
              <Sparkles className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <div className="font-medium text-red-800">AI Powered</div>
              <div className="text-sm text-red-600">Advanced summarization</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
