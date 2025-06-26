"use client"

import dynamic from 'next/dynamic'
import { VideoFormSkeleton, VideoResultsSkeleton } from '@/components/ui/skeleton-layouts'

// Lazy load heavy components with loading states
export const LazyVideoFormInput = dynamic(
  () => import('@/components/video-form-input'),
  {
    loading: () => <VideoFormSkeleton />,
    ssr: false
  }
)

export const LazyVideoResults = dynamic(
  () => import('@/components/video-results'),
  {
    loading: () => <VideoResultsSkeleton />,
    ssr: false
  }
)

export const LazyBanner = dynamic(
  () => import('@/components/banner'),
  {
    loading: () => <div className="h-[250px] w-[300px] bg-gray-100 animate-pulse rounded" />,
    ssr: false
  }
)

export const LazyAdScript = dynamic(
  () => import('@/components/ui/ad-script'),
  {
    loading: () => null,
    ssr: false
  }
)
