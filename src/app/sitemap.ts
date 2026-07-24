import type { MetadataRoute } from 'next';

import { getSitemapEntries, SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries().map(({ path, lastModified, changeFrequency, priority }) => ({
    url: path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`,
    lastModified: new Date(lastModified),
    changeFrequency,
    priority,
  }));
}
