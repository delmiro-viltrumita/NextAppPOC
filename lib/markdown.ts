import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: false });

/** Converte o corpo em Markdown para HTML (conteúdo confiável, autorado no CMS). */
export function renderMarkdown(md: string | undefined): string {
  if (!md) return '';
  return marked.parse(md, { async: false }) as string;
}
