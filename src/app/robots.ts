import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const appUrl = process.env.APP_URL || "http://localhost:3000";

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${appUrl}/sitemap.xml`,
  }
}