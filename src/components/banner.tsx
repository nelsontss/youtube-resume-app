'use client'

import { useEffect, useRef } from 'react'

type BannerProps = {
  bannerKey: string;
  height: number;
  width: number;
}

export default function Banner({ bannerKey, height, width }: BannerProps) {
  const banner = useRef<HTMLDivElement>(null)
  
  const atOptions = {
    key: bannerKey,
    format: 'iframe',
    height,
    width,
    params: {},
  }

  useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
      const conf = document.createElement('script')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `//www.highperformanceformat.com/${atOptions.key}/invoke.js`
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`
      banner.current.append(conf)
      banner.current.append(script)
    }
  }, [banner])

  return (
    <div
      style={{
      height,
      width,
      color: '#ffffff',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: '1px',
      borderColor: '#E5E7EB',
      }}
      ref={banner}
    >
    </div>
  )
}
