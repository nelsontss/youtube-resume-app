'use client'

import Script from 'next/script'

interface AdScriptProps {
  src: string
  id?: string
  containerId?: string
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload' | 'worker'
  'data-cfasync'?: string
  type?: string
}

/**
 * Component for rendering ad scripts - only rendered when ads are enabled at server level
 */
export default function AdScript({ src, id, containerId, strategy = 'lazyOnload', ...props }: AdScriptProps) {
  return (
    <>
      <Script 
        src={src} 
        id={id}
        strategy={strategy}
        {...props}
      />
      {containerId && <div id={containerId}></div>}
    </>
  )
}
