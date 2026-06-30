import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <h1 className="text-4xl font-bold text-zinc-900">404</h1>
      <p className="mt-2 text-zinc-600">Artigo não encontrado.</p>
      <Link href="/" className="mt-6 inline-block text-brand hover:underline">
        ← Voltar para o blog
      </Link>
    </div>
  );
}
