"use client"

import { useEffect } from 'react'

interface PerformanceNavigationTiming extends PerformanceEntry {
  processingStart?: number
}

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput?: boolean
  value?: number
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Observe LCP (Largest Contentful Paint)
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            // Send to analytics service in production
            if (process.env.NODE_ENV === 'development') {
              // eslint-disable-next-line no-console
              console.log('LCP:', entry.startTime)
            }
          }
          if (entry.entryType === 'first-input') {
            const fidEntry = entry as PerformanceNavigationTiming
            if (fidEntry.processingStart) {
              if (process.env.NODE_ENV === 'development') {
                // eslint-disable-next-line no-console
                console.log('FID:', fidEntry.processingStart - entry.startTime)
              }
            }
          }
        }
      })

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] })
      } catch (_error) {
        // Browser doesn't support these entry types
      }

      // Monitor CLS (Cumulative Layout Shift)
      let clsScore = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const clsEntry = entry as LayoutShiftEntry
          if (clsEntry.hadRecentInput === false && clsEntry.value) {
            clsScore += clsEntry.value
          }
        }
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('CLS:', clsScore)
        }
      })

      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] })
      } catch (_error) {
        // Browser doesn't support layout-shift
      }

      // Monitor resource loading
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 1000) { // Log slow resources (>1s)
            if (process.env.NODE_ENV === 'development') {
              // eslint-disable-next-line no-console
              console.log('Slow resource:', entry.name, entry.duration)
            }
          }
        }
      })

      try {
        resourceObserver.observe({ entryTypes: ['resource'] })
      } catch (_error) {
        // Browser doesn't support resource entry type
      }

      return () => {
        observer.disconnect()
        clsObserver.disconnect()
        resourceObserver.disconnect()
      }
    }
  }, [])

  return null
}
