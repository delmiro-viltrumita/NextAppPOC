import Image from 'next/image';
import Link from 'next/link';
import { coverOf, type DeliveryDocument } from '@/lib/types';
import { formatDate } from './date';

export function PostCard({ post, featured = false }: { post: DeliveryDocument; featured?: boolean }) {
  const cover = coverOf(post);
  const date = formatDate(post.data.publishedAt || post.first_publication_date);

  if (featured) {
    return (
      <Link
        href={`/blog/${post.uid}`}
        className="group grid gap-6 rounded-2xl border border-zinc-200 bg-white p-4 md:grid-cols-2 md:p-6 hover:border-brand transition-colors"
      >
        {cover && (
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
            <Image
              src={cover.url}
              alt={cover.alt}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-col justify-center">
          <div className="mb-2 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-brand-dark">
                {t}
              </span>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 md:text-3xl">{post.data.title}</h2>
          <p className="mt-3 text-zinc-600">{post.data.excerpt}</p>
          <p className="mt-4 text-sm text-zinc-500">
            {post.data.author} · {date}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.uid}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white hover:border-brand transition-colors"
    >
      {cover && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span key={t} className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-brand-dark">
              {t}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-semibold text-zinc-900">{post.data.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-zinc-600">{post.data.excerpt}</p>
        <p className="mt-4 text-xs text-zinc-500">{date}</p>
      </div>
    </Link>
  );
}
