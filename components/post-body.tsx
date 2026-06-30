import { renderMarkdown } from '@/lib/markdown';

export function PostBody({ markdown }: { markdown?: string }) {
  const html = renderMarkdown(markdown);
  return (
    <div
      className="article-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
