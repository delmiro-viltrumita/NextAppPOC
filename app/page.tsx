import { getPosts } from '@/lib/delivery';
import { PostCard } from '@/components/post-card';

export const revalidate = 300;

export default async function HomePage() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className="py-20 text-center text-zinc-500">
        Nenhum artigo publicado ainda.
      </div>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <div className="space-y-12">
      <section>
        <h1 className="mb-2 text-3xl font-bold text-zinc-900">Blog</h1>
        <p className="text-zinc-600">
          Artigos servidos pela Delivery API do Ignite CMS — renderizados no servidor com SEO completo.
        </p>
      </section>

      <PostCard post={featured} featured />

      {rest.length > 0 && (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      )}
    </div>
  );
}
