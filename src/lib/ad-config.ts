/**
 * Ad configuration utility
 * Controls whether ads should be displayed based on environment variables
 * SERVER-SIDE ONLY - Environment variable is not exposed to client
 */

/**
 * Server-side function to check if ads should be displayed
 * This reads from server-only environment variables
 */
export function shouldShowAds(): boolean {
  // Check server-side environment variable only
  const adsEnabled = process.env.ADS_ENABLED?.toLowerCase()
  
  // Default to showing ads unless explicitly set to 'false', 'disabled', 'hidden', or '0'
  const disabledValues = ['false', 'disabled', 'hidden', '0', 'off']
  
  return !disabledValues.includes(adsEnabled || '')
}

/**
 * Get ad configuration for server components
 */
export function getAdConfig() {
  return {
    enabled: shouldShowAds(),
    environment: process.env.NODE_ENV || 'development'
  }
}
