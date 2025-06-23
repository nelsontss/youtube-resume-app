import React from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/utils/providers";
import { Analytics } from "@vercel/analytics/react"
import GoogleAnalytics from "@/components/utils/google-analytics";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My App",
  description: "My App description",
  twitter: {
    card: 'summary_large_image',
    title: 'My App',
    description: 'My App description',
    creator: '@nelsontss_en',
    creatorId: '1467726470533754880',
    site: '@nelsontss_en',
    images: [`${process.env.APP_URL}/logo-short.svg`], // Must be an absolute URL
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'My App',
    description: 'My App description',
    type: 'article',
    publishedTime: '2024-07-03T00:00:00.000Z',
    authors: ['Nelson Sousa'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <GoogleAnalytics />
        <Analytics />
        <Script data-cfasync="false" type='text/javascript' src='//pl26994585.profitableratecpm.com/72/df/2f/72df2ff5cc6a33cc021c764605454547.js' />
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