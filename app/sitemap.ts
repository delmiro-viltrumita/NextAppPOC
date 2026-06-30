import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/delivery';
import { siteUrl } from '@/lib/seo';

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const posts = await getPosts();

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    ...posts.map((p) => ({
      url: `${base}/blog/${p.uid}`,
      lastModified: new Date(p.last_publication_date),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
