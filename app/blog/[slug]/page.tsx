import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPosts } from '@/lib/delivery';
import { buildJsonLd, buildMetadata } from '@/lib/seo';
import { coverOf } from '@/lib/types';
import { PostBody } from '@/components/post-body';
import { formatDate } from '@/components/date';

export const revalidate = 300;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.uid }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Artigo não encontrado' };
  return buildMetadata(post);
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const cover = coverOf(post);
  const date = formatDate(post.data.publishedAt || post.first_publication_date);
  const jsonLd = buildJsonLd(post);

  return (
    <article className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/" className="text-sm text-brand hover:underline">
        ← Voltar
      </Link>

      <div className="mt-4 mb-3 flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <span key={t} className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-brand-dark">
            {t}
          </span>
        ))}
      </div>

      <h1 className="text-3xl font-bold text-zinc-900 md:text-4xl">{post.data.title}</h1>
      <p className="mt-3 text-zinc-500">
        {post.data.author} · {date}
      </p>

      {cover && (
        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-8">
        <PostBody markdown={post.data.body} />
      </div>
    </article>
  );
}
