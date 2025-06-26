import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.APP_URL || 'http://localhost:3000'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/coming-soon`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Dynamic pages - You can add more dynamic routes here
  const dynamicPages: MetadataRoute.Sitemap = [
    // Example: summary pages, user profiles, etc.
    // These would come from your database in a real app
  ]

  return [...staticPages, ...dynamicPages]
}
