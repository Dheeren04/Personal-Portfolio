import type { MetadataRoute } from 'next';
import { siteConfig } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.meta.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}

