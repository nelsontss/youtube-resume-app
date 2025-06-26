import React from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/utils/providers";
import { Analytics } from "@vercel/analytics/react"
import GoogleAnalytics from "@/components/utils/google-analytics";
import PerformanceMonitor from "@/components/utils/performance-monitor";
import StructuredData from "@/components/seo/structured-data";
import { generateSEOMetadata } from "@/components/seo/meta-tags";
import Script from "next/script";
import { shouldShowAds } from "@/lib/ad-config";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
});

export const metadata: Metadata = generateSEOMetadata({
  title: "VideoSummarizer - AI YouTube Video Summarizer | Free Video Summaries",
  description: "Transform YouTube videos into structured summaries instantly. Free AI-powered tool for content creators, researchers, and students. Get key insights from any video in seconds.",
  keywords: [
    "youtube summarizer",
    "video summary",
    "AI video analysis", 
    "youtube transcript",
    "video to text",
    "content summarization",
    "ai video summarizer",
    "youtube ai tool",
    "video insights",
    "free video summarizer"
  ]
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsEnabled = shouldShowAds()

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Structured Data */}
        <StructuredData type="webapp" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {adsEnabled && (
          <>
            <link rel="preconnect" href="https://profitableratecpm.com" />
            <link rel="dns-prefetch" href="//pl26991633.profitableratecpm.com" />
            <link rel="dns-prefetch" href="//pl26992838.profitableratecpm.com" />
          </>
        )}
        
        {/* Service Worker Registration */}
        <Script
          id="sw-registration"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
        
        <GoogleAnalytics />
        <Analytics />
        <PerformanceMonitor />
        {adsEnabled && (
          <Script data-cfasync="false" type='text/javascript' src='//pl26994585.profitableratecpm.com/72/df/2f/72df2ff5cc6a33cc021c764605454547.js' />
        )}
      </head>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}