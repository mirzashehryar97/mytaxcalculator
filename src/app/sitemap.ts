import type { MetadataRoute } from 'next';

import { getSitemapEntries, LAST_UPDATED, SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(LAST_UPDATED);
  return getSitemapEntries().map(({ path, changeFrequency, priority }) => ({
    url: path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
