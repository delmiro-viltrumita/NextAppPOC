# Ignite Blog — demo

Protótipo de blog em **Next.js 15 (App Router)** que consome a **Delivery API** do
Ignite CMS e demonstra o SEO server-side: metatags, Open Graph/Twitter, JSON-LD
(`BlogPosting`), `sitemap.xml` e `robots.txt`.

## Rodando

```bash
cd blog-demo
cp .env.example .env.local   # já preenchido com o token de demo
npm install
npm run dev                  # http://localhost:3005
```

## Como funciona

- **`lib/delivery.ts`** — cliente da Delivery API (Bearer token, só server-side, ISR de 5 min).
- **`lib/seo.ts`** — mapeia o objeto `seo` do envelope para o `Metadata` do Next + JSON-LD.
- **`lib/markdown.ts`** — converte o corpo (Markdown) em HTML.
- **`app/page.tsx`** — home: artigo em destaque + grid.
- **`app/blog/[slug]/page.tsx`** — artigo (SSG via `generateStaticParams` + ISR).
- **`app/sitemap.ts` / `app/robots.ts`** — gerados a partir da lista de posts.

## Variáveis de ambiente

| Var                  | Descrição                                   |
|----------------------|---------------------------------------------|
| `DELIVERY_API_URL`   | Base da Delivery API (sem barra final)      |
| `DELIVERY_API_TOKEN` | Token `cms_*` (server-side, nunca no client)|
| `DELIVERY_POST_TYPE` | Tipo de conteúdo dos artigos (`post`)       |
| `SITE_URL`           | URL pública (canonical, OG, sitemap)        |

## Conferindo o SEO

Após `npm run dev`, veja o HTML servido:

```bash
curl -s http://localhost:3005/blog/seo-tecnico-com-next-js | grep -iE 'og:|twitter:|application/ld|<title|description'
curl -s http://localhost:3005/sitemap.xml
curl -s http://localhost:3005/robots.txt
```
