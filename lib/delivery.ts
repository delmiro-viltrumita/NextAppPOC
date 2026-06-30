import type { DeliveryDocument, DeliveryListResponse } from './types';

function baseUrl(): string {
  const raw = process.env.DELIVERY_API_URL?.trim();
  if (!raw) throw new Error('DELIVERY_API_URL não configurada');
  return raw.replace(/\/$/, '');
}

function postType(): string {
  return process.env.DELIVERY_POST_TYPE?.trim() || 'post';
}

function authHeaders(): HeadersInit {
  const token = process.env.DELIVERY_API_TOKEN?.trim();
  if (!token) throw new Error('DELIVERY_API_TOKEN não configurado');
  return { Accept: 'application/json', Authorization: `Bearer ${token}` };
}

export class DeliveryError extends Error {
  constructor(public readonly status: number, message: string) {
    super(`Delivery API ${status}: ${message}`);
    this.name = 'DeliveryError';
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: authHeaders(),
    // Sem cache: cada request bate na Delivery API e devolve a última versão.
    cache: 'no-store',
  });
  if (!res.ok) throw new DeliveryError(res.status, await res.text());
  return res.json() as Promise<T>;
}

/** Lista de artigos publicados, mais recentes primeiro (ordem da API). */
export async function getPosts(limit = 20): Promise<DeliveryDocument[]> {
  const params = new URLSearchParams({ page: '1', limit: String(limit) });
  const data = await fetchJson<DeliveryListResponse>(
    `${baseUrl()}/${encodeURIComponent(postType())}?${params}`,
  );
  return data.results;
}

/** Um artigo pelo slug, ou null se não existir. */
export async function getPostBySlug(slug: string): Promise<DeliveryDocument | null> {
  try {
    return await fetchJson<DeliveryDocument>(
      `${baseUrl()}/${encodeURIComponent(postType())}/${encodeURIComponent(slug)}`,
    );
  } catch (err) {
    if (err instanceof DeliveryError && err.status === 404) return null;
    throw err;
  }
}
