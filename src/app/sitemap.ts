import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fileflow.com'

  const routes = [
    '',
    '/image-tools',
    '/image-compressor',
    '/image-resizer',
    '/image-converter',
    '/image-to-pdf',
    '/pdf-tools',
    '/pdf-merge',
    '/pdf-split',
    '/pdf-compress',
    '/pdf-rotate',
    '/pdf-page-delete',
    '/pdf-page-extract',
    '/pdf-watermark',
    '/audio-tools',
    '/wav-to-mp3',
    '/mp3-to-wav',
    '/audio-compressor',
    '/audio-converter',
    '/audio-cutter',
    '/audio-volume',
    '/tools',
    '/qr-generator',
    '/password-generator',
    '/word-counter',
    '/json-formatter',
    '/color-picker',
    '/base64',
    '/uuid-generator',
    '/text-case',
    '/timestamp',
    '/unit-converter',
    '/percentage-calculator',
    '/pricing',
    '/privacy',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
