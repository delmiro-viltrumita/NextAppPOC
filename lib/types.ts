// Espelha o envelope retornado pela Delivery API do Ignite CMS.

export interface PostData {
  title?: string;
  excerpt?: string;
  body?: string; // Markdown
  author?: string;
  publishedAt?: string;
  coverImage?: string | { url: string; alt?: string | null };
  [key: string]: unknown;
}

export interface PostSeo {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schemaType?: string;
  focusKeyphrase?: string;
  [key: string]: unknown;
}

export interface DeliveryDocument {
  id: string;
  uid: string;
  type: string;
  tags: string[];
  lang: string;
  alternate_languages: { id: string; uid: string; type: string; lang: string }[];
  data: PostData;
  seo: PostSeo;
  first_publication_date: string;
  last_publication_date: string;
}

export interface DeliveryListResponse {
  page: number;
  results_per_page: number;
  total_results_size: number;
  total_pages: number;
  results: DeliveryDocument[];
}

/** Normaliza o coverImage (string ou objeto) para { url, alt }. */
export function coverOf(post: DeliveryDocument): { url: string; alt: string } | null {
  const c = post.data.coverImage;
  if (!c) return null;
  const url = typeof c === 'string' ? c : c.url;
  if (!url) return null;
  const alt =
    (typeof c === 'object' && c.alt) || post.data.title || post.uid;
  return { url, alt: String(alt) };
}
