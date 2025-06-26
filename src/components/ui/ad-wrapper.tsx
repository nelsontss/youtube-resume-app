'use client'

import { ReactNode } from 'react'

interface AdWrapperProps {
  children: ReactNode
  className?: string
}

/**
 * Wrapper component for ads - only rendered when ads are enabled at server level
 * This component now assumes ads are enabled since it's conditionally rendered
 */
export default function AdWrapper({ children, className }: AdWrapperProps) {
  return <div className={className}>{children}</div>
}
