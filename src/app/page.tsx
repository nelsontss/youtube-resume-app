"use server"

import React, { Suspense } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, FileText, Zap } from "lucide-react"
import { VideoProvider } from "@/contexts/video-context"
import { LazyVideoFormInput, LazyVideoResults, LazyBanner, LazyAdScript } from "@/components/lazy-components"
import { VideoFormSkeleton, VideoResultsSkeleton, SidebarSkeleton } from "@/components/ui/skeleton-layouts"
import { shouldShowAds } from "@/lib/ad-config"

export default async function YouTubeSummarizer() {
  const adsEnabled = shouldShowAds()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="VideoSummarizer Logo" 
                width={60}
                height={70}
                className="object-contain"
                priority
              />
              <div>
                <span className="text-xl font-bold text-gray-900">VideoSummarizer</span>
                <p className="text-sm text-gray-600">AI-powered YouTube video summaries</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Sparkles className="w-3 h-3 mr-1" />
              Free to use
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content - flex-grow pushes footer down */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">
                Transform YouTube Videos into
                <span className="text-red-500"> AI-Powered Summaries</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get instant, AI-generated summaries of any YouTube video in clean markdown format. Perfect for research,
                note-taking, and content creation. Free and fast.
              </p>
            </div>

            {/* Input Form and Results */}
            <VideoProvider>
              <div className="space-y-8">
                <Suspense fallback={<VideoFormSkeleton />}>
                  <LazyVideoFormInput adsEnabled={adsEnabled} />
                </Suspense>
                
                {/* Sidebar with Ads - Mobile/Tablet View */}
                <div className="lg:hidden space-y-6">
                  {/* Sidebar Ad 1 */}
                  {adsEnabled && (
                    <Suspense fallback={<div className="h-[60px] w-[468px] bg-gray-100 animate-pulse rounded mx-auto" />}>
                      <LazyBanner bannerKey="7554d80bb458191c9d5e609fe384750c" height={60} width={468} />
                    </Suspense>
                  )}
                </div>
                
                <Suspense fallback={<VideoResultsSkeleton />}>
                  <LazyVideoResults />
                </Suspense>
              </div>
            </VideoProvider>
          </div>

          {/* Sidebar with Ads - Desktop View */}
          <div className="hidden lg:block lg:col-span-1 space-y-6 w-[300px]">
            {/* Sidebar Ad 1 */}
            {adsEnabled && (
              <Suspense fallback={<div className="h-[250px] w-[300px] bg-gray-100 animate-pulse rounded" />}>
                <LazyBanner bannerKey="d342950369c684af192e3b3c81921af8" height={250} width={300} />
              </Suspense>
            )}
            
            {/* Features */}
            <Suspense fallback={<SidebarSkeleton />}>
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
            </Suspense>
          </div>
        </div>

        {/* Bottom Banner Ad */}
        {adsEnabled && (
          <Suspense fallback={null}>
            <LazyAdScript 
              src="//pl26991633.profitableratecpm.com/b170a06f6c6722d14afd469eb710b7cc/invoke.js"
              data-cfasync="false"
              containerId="container-b170a06f6c6722d14afd469eb710b7cc"
            />
          </Suspense>
        )}
        </div>
      </main>
      
      {/* Footer - will be pushed to bottom */}
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 VideoSummarizer. Transform your video consumption with AI-powered summaries.</p>
          </div>
        </div>
      </footer>
      
      {adsEnabled && (
        <Suspense fallback={null}>
          <LazyAdScript 
            src="//pl26992838.profitableratecpm.com/e6/fe/0e/e6fe0eadd7b19f05967b83dd5adfc4d4.js"
            data-cfasync="false"
            type="text/javascript"
          />
        </Suspense>
      )}
    </div>
  )
}
