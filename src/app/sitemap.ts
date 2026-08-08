import { MetadataRoute } from 'next'
import { toolsData } from '@/lib/tools'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fileefloww.vercel.app'

  const staticRoutes = [
    '',
    '/image-tools',
    '/pdf-tools',
    '/audio-tools',
    '/tools',
    '/privacy',
  ]

  const toolRoutes = toolsData.map(tool => tool.href)

  // Combine and deduplicate
  const allRoutes = Array.from(new Set([...staticRoutes, ...toolRoutes]))

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
