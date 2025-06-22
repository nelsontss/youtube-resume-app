import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Youtube, Sparkles, Clock, FileText, Zap, Bell, CheckCircle, Rocket, Users } from "lucide-react"
import { redirect } from "next/navigation"

async function subscribeToNewsletter(formData: FormData) {
  "use server"

  const email = formData.get("email") as string

  if (!email || !email.includes("@")) {
    redirect("/coming-soon?error=invalid-email")
  }

  // Simulate API call to save email to database/newsletter service
  // In production, you would integrate with your email service provider
  console.log("Subscribing email:", email)

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1000))

  redirect("/coming-soon?success=subscribed")
}

interface ComingSoonPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ComingSoon({ searchParams }: ComingSoonPageProps) {
  const params = await searchParams
  const isSubscribed = params.success === "subscribed"
  const hasError = params.error === "invalid-email"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500 rounded-lg">
                <Youtube className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">VideoSummarizer</h1>
                <p className="text-sm text-gray-600">AI-powered YouTube video summaries</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              <Rocket className="w-3 h-3 mr-1" />
              Coming Soon
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Revolutionary AI Technology
              </div>

              <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                Transform YouTube Videos into
                <span className="text-red-500 block">Instant Markdown Summaries</span>
              </h2>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We&apos;re building the most advanced AI-powered tool to convert any YouTube video into clean, structured
                markdown summaries. Save hours of watching time and get the key insights instantly.
              </p>

              <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Currently in development
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  1,247+ people waiting
                </div>
              </div>
            </div>

            {/* Top Banner Ad Space - Hidden for now */}
            {/* 
            <Card className="border-dashed border-2 border-gray-300 bg-gray-50">
              <CardContent className="p-8 text-center">
                <div className="text-gray-500 space-y-2">
                  <div className="text-sm font-medium">Advertisement Space</div>
                  <div className="text-xs">728 x 90 Banner Ad</div>
                </div>
              </CardContent>
            </Card>
            */}

            {/* Email Signup */}
            <Card className="shadow-xl border-0 bg-gradient-to-r from-red-500 to-orange-500 text-white">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Be the First to Know</h3>
                    <p className="text-red-100">
                      Get notified when VideoSummarizer launches and receive exclusive early access
                    </p>
                  </div>

                  {!isSubscribed ? (
                    <div className="max-w-md mx-auto">
                      <form action={subscribeToNewsletter} className="space-y-4">
                        <div className="flex gap-3">
                          <Input
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            className="flex-1 h-12 bg-white text-gray-900 border-0"
                            required
                          />
                          <Button type="submit" className="h-12 px-6 bg-white text-red-500 hover:bg-gray-100">
                            <Bell className="w-4 h-4 mr-2" />
                            Notify Me
                          </Button>
                        </div>
                        {hasError && <p className="text-red-200 text-sm">Please enter a valid email address.</p>}
                      </form>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3 text-green-100">
                      <CheckCircle className="w-6 h-6" />
                      <span className="text-lg font-medium">Thanks! We&apos;ll notify you when we launch.</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Features Preview */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">What&apos;s Coming</h3>
                <p className="text-gray-600">
                  Powerful features designed to revolutionize how you consume video content
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Zap className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <CardTitle>Lightning Fast Processing</CardTitle>
                        <CardDescription>Get summaries in under 30 seconds</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Our advanced AI processes videos at incredible speed, delivering comprehensive summaries faster
                      than you can say &ldquo;subscribe and hit the bell icon.&rdquo;
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle>Perfect Markdown Format</CardTitle>
                        <CardDescription>Clean, structured, ready-to-use</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Every summary is formatted in beautiful markdown with headers, bullet points, timestamps, and key
                      insights perfectly organized.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Sparkles className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle>AI-Powered Intelligence</CardTitle>
                        <CardDescription>Smart extraction of key points</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Our AI doesn&apos;t just transcribe - it understands context, identifies main topics, and extracts the
                      most valuable insights from any video.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Clock className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle>Time-Stamped Sections</CardTitle>
                        <CardDescription>Jump to any part instantly</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Every summary includes precise timestamps, so you can quickly navigate to specific sections of the
                      original video when needed.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Progress Indicator */}
            <Card className="bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">Development Progress</h3>

                  <div className="max-w-2xl mx-auto space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">AI Engine Development</span>
                      <span className="font-medium text-green-600">85% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">User Interface</span>
                      <span className="font-medium text-blue-600">70% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Testing & Optimization</span>
                      <span className="font-medium text-orange-600">40% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <p className="text-gray-700 font-medium">🚀 Expected Launch: Q3 2025</p>
                    <p className="text-sm text-gray-600 mt-1">
                      We&apos;re working around the clock to bring you the best experience
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with Ads - Hidden for now */}
          <div className="lg:col-span-1 space-y-6">
            {/* Sidebar Ad 1 - Hidden */}
            {/* 
            <Card className="border-dashed border-2 border-gray-300 bg-gray-50">
              <CardContent className="p-6 text-center">
                <div className="text-gray-500 space-y-2">
                  <div className="text-sm font-medium">Advertisement</div>
                  <div className="text-xs">300 x 250 Medium Rectangle</div>
                </div>
              </CardContent>
            </Card>
            */}

            {/* Launch Benefits */}
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg text-orange-800">Early Access Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-orange-800">Free Premium Trial</div>
                    <div className="text-sm text-orange-600">30 days of unlimited summaries</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-orange-800">Priority Support</div>
                    <div className="text-sm text-orange-600">Direct line to our team</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-orange-800">Feature Requests</div>
                    <div className="text-sm text-orange-600">Help shape the product</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sidebar Ad 2 - Hidden */}
            {/* 
            <Card className="border-dashed border-2 border-gray-300 bg-gray-50">
              <CardContent className="p-6 text-center">
                <div className="text-gray-500 space-y-2">
                  <div className="text-sm font-medium">Advertisement</div>
                  <div className="text-xs">300 x 600 Half Page</div>
                </div>
              </CardContent>
            </Card>
            */}
          </div>
        </div>

        {/* Bottom Banner Ad - Hidden for now */}
        {/* 
        <div className="mt-12">
          <Card className="border-dashed border-2 border-gray-300 bg-gray-50">
            <CardContent className="p-8 text-center">
              <div className="text-gray-500 space-y-2">
                <div className="text-sm font-medium">Advertisement Space</div>
                <div className="text-xs">970 x 250 Billboard Ad</div>
              </div>
            </CardContent>
          </Card>
        </div>
        */}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 VideoSummarizer. Revolutionizing video consumption with AI. Coming Soon.</p>
            <p className="text-sm mt-2">
              Follow us for updates and be the first to experience the future of video summaries.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
