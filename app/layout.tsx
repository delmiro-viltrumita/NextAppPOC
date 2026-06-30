import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { siteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: 'Ignite Blog — demo da Delivery API',
    template: '%s | Ignite Blog',
  },
  description:
    'Blog de demonstração em Next.js consumindo a Delivery API do Ignite CMS, com SEO server-side completo.',
  openGraph: {
    type: 'website',
    siteName: 'Ignite Blog',
    locale: 'pt_BR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <SiteHeader />
        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
        <footer className="border-t border-zinc-200 py-8 text-center text-sm text-zinc-500">
          Ignite Blog · protótipo · conteúdo via Delivery API
        </footer>
      </body>
    </html>
  );
}
