import React from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/utils/providers";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Analytics } from "@vercel/analytics/react"
import GoogleAnalytics from "@/components/utils/google-analytics";

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

type FullWidthSectionProps = {
  children: React.ReactNode;
  className?: string;
}

const FullWidthSection: React.FC<FullWidthSectionProps> = ({ children, className = '' }) => (
  <div className={`w-full ${className}`}>
    {children}
  </div>
);

type ContentContainerProps = {
  children: React.ReactNode;
  className?: string;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children, className = '' }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

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
      </head>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <FullWidthSection>
              <Navbar />
            </FullWidthSection>
            <main className="flex-grow">
              {children}
            </main>
            <FullWidthSection className="bg-neutral">
              <ContentContainer>
                <Footer />
              </ContentContainer>
            </FullWidthSection>
          </div>
        </Providers>
      </body>
    </html>
  );
}

export { FullWidthSection, ContentContainer };