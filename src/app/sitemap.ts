import { MetadataRoute } from 'next'
import { toolsData } from '@/lib/tools'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://filoza.vercel.app'

  // Static routes with differentiated priorities
  const staticEntries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/image-tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/pdf-tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/documents`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/audio-tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/archive`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/file-transfer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  // High-traffic tool pages get priority 0.8, rest get 0.7
  const highPriorityTools = [
    '/image-compressor', '/image-resizer', '/image-converter', '/background-remover',
    '/pdf-merge', '/pdf-compress', '/pdf-split', '/pdf-to-word', '/word-to-pdf',
    '/zip-extractor', '/zip-creator', '/jpg-to-png', '/png-to-jpg', '/webp-converter',
  ]

  // Get static route URLs to avoid duplicates
  const staticUrls = new Set(staticEntries.map(e => e.url))

  const toolEntries: MetadataRoute.Sitemap = toolsData
    .filter(tool => !staticUrls.has(`${baseUrl}${tool.href}`))
    .map(tool => ({
      url: `${baseUrl}${tool.href}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: highPriorityTools.includes(tool.href) ? 0.8 : 0.7,
    }))

  return [...staticEntries, ...toolEntries]
}
