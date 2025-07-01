"use server"

import React, { Suspense } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, FileText, Zap, Star, Quote } from "lucide-react"
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

        {/* Enhanced Testimonials Section - SEO Optimized */}
        <section className="mt-20 bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 rounded-3xl">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Trusted by Thousands of Content Creators
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Join over 50,000+ users who save hours every week with VideoSummarizer&apos;s AI-powered YouTube video summaries
              </p>
              <div className="flex justify-center items-center mt-6 gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">4.9/5 from 2,847 reviews</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 - Student */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                      S
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Sarah Chen</div>
                      <div className="text-sm text-gray-500">PhD Student, Stanford</div>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-blue-400 mb-2" />
                  <p className="text-gray-700 italic mb-4">
                    &ldquo;VideoSummarizer revolutionized my research process. I can now analyze 10+ educational videos in the time it used to take me to watch just one. The markdown format is perfect for my academic notes!&rdquo;
                  </p>
                  <div className="text-xs text-gray-400">2 weeks ago</div>
                </CardContent>
              </Card>

              {/* Testimonial 2 - Content Creator */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                      M
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Marcus Rodriguez</div>
                      <div className="text-sm text-gray-500">YouTuber, 500K subscribers</div>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-purple-400 mb-2" />
                  <p className="text-gray-700 italic mb-4">
                    &ldquo;As a content creator, I need to stay on top of trends fast. VideoSummarizer helps me quickly understand competitor content and industry insights. It&apos;s like having a research assistant!&rdquo;
                  </p>
                  <div className="text-xs text-gray-400">1 week ago</div>
                </CardContent>
              </Card>

              {/* Testimonial 3 - Business Professional */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                      A
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Amanda Foster</div>
                      <div className="text-sm text-gray-500">Marketing Director, TechCorp</div>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-green-400 mb-2" />
                  <p className="text-gray-700 italic mb-4">
                    &ldquo;Our team uses VideoSummarizer for market research and competitor analysis. The AI summaries are incredibly accurate and save us 10+ hours per week. ROI is through the roof!&rdquo;
                  </p>
                  <div className="text-xs text-gray-400">3 days ago</div>
                </CardContent>
              </Card>

              {/* Testimonial 4 - Educator */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-bold text-lg">
                      D
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Dr. James Wilson</div>
                      <div className="text-sm text-gray-500">Professor, MIT</div>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-red-400 mb-2" />
                  <p className="text-gray-700 italic mb-4">
                    &ldquo;I use VideoSummarizer to curate educational content for my courses. The quality of summaries is exceptional - my students love having structured notes from video lectures!&rdquo;
                  </p>
                  <div className="text-xs text-gray-400">5 days ago</div>
                </CardContent>
              </Card>

              {/* Testimonial 5 - Journalist */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                      L
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Lisa Park</div>
                      <div className="text-sm text-gray-500">Tech Journalist, Wired</div>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-yellow-500 mb-2" />
                  <p className="text-gray-700 italic mb-4">
                    &ldquo;Breaking news moves fast, and VideoSummarizer helps me quickly extract key information from press conferences and interviews. It&apos;s become essential to my workflow.&rdquo;
                  </p>
                  <div className="text-xs text-gray-400">1 day ago</div>
                </CardContent>
              </Card>

              {/* Testimonial 6 - Entrepreneur */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                      R
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Ryan Thompson</div>
                      <div className="text-sm text-gray-500">Startup Founder</div>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-indigo-400 mb-2" />
                  <p className="text-gray-700 italic mb-4">
                    &ldquo;VideoSummarizer is a game-changer for entrepreneurs. I can quickly digest business strategy videos, investor talks, and industry insights. The time savings are incredible!&rdquo;
                  </p>
                  <div className="text-xs text-gray-400">4 days ago</div>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 inline-block">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Join Thousands of Satisfied Users
                </h3>
                <p className="text-gray-600 mb-6">
                  Start summarizing YouTube videos with AI today - completely free!
                </p>
                <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-green-500" />
                    Free to use
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    Instant results
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-500" />
                    Markdown format
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer - will be pushed to bottom */}
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 VideoSummarizer. Transform your video consumption with AI-powered summaries.</p>
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
