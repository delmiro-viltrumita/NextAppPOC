import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-zinc-900">
          <span className="grid h-7 w-7 place-items-center rounded bg-brand text-white">I</span>
          <span>Ignite Blog</span>
        </Link>
        <span className="text-sm text-zinc-500">Demo · Delivery API</span>
      </div>
    </header>
  );
}
