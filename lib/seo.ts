import type { Metadata } from 'next';
import { coverOf, type DeliveryDocument } from './types';

export function siteUrl(): string {
  return (process.env.SITE_URL?.trim() || 'http://localhost:3001').replace(/\/$/, '');
}

export function postUrl(slug: string): string {
  return `${siteUrl()}/blog/${slug}`;
}

/**
 * Mapeia o objeto `seo` do envelope (com fallback para `data`) no Metadata do Next.
 * É aqui que a Delivery API vira <title>, <meta>, Open Graph e Twitter Card.
 */
export function buildMetadata(post: DeliveryDocument): Metadata {
  const { seo, data } = post;
  const url = seo.canonicalUrl?.trim() || postUrl(post.uid);
  const title = seo.metaTitle?.trim() || data.title || post.uid;
  const description = seo.metaDescription?.trim() || data.excerpt || '';
  const cover = coverOf(post);
  const ogImage = seo.ogImage?.trim() || cover?.url;

  return {
    // absolute: respeita o metaTitle definido no CMS sem o sufixo do template.
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: seo.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'article',
      url,
      title: seo.ogTitle?.trim() || title,
      description: seo.ogDescription?.trim() || description,
      images: ogImage ? [{ url: ogImage }] : undefined,
      publishedTime: data.publishedAt || post.first_publication_date,
      authors: data.author ? [data.author] : undefined,
    },
    twitter: {
      card: (seo.twitterCard as 'summary_large_image') || 'summary_large_image',
      title: seo.twitterTitle?.trim() || seo.ogTitle?.trim() || title,
      description:
        seo.twitterDescription?.trim() || seo.ogDescription?.trim() || description,
      images: seo.twitterImage?.trim() || ogImage ? [seo.twitterImage?.trim() || ogImage!] : undefined,
    },
  };
}

/** JSON-LD BlogPosting para rich results. */
export function buildJsonLd(post: DeliveryDocument): Record<string, unknown> {
  const { seo, data } = post;
  const cover = coverOf(post);
  return {
    '@context': 'https://schema.org',
    '@type': seo.schemaType?.trim() || 'BlogPosting',
    headline: seo.metaTitle?.trim() || data.title || post.uid,
    description: seo.metaDescription?.trim() || data.excerpt || '',
    image: seo.ogImage?.trim() || cover?.url,
    datePublished: data.publishedAt || post.first_publication_date,
    dateModified: post.last_publication_date,
    author: data.author
      ? { '@type': 'Person', name: data.author }
      : undefined,
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl(post.uid) },
    keywords: post.tags?.join(', ') || undefined,
  };
}
