'use client';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import { cn } from '@/lib/utils';

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

interface PrettyCodeNode {
  type: string;
  children: Array<{ type: string; value: string }>;
  properties: {
    className?: string[];
  };
}

const options = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  onVisitLine(node: PrettyCodeNode) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  onVisitHighlightedLine(node: PrettyCodeNode) {
    node.properties.className = node.properties.className || [];
    node.properties.className.push('highlighted');
  },
  onVisitHighlightedWord(node: PrettyCodeNode) {
    node.properties.className = ['word'];
  },
};

const MarkdownPreview = React.forwardRef<HTMLDivElement, MarkdownPreviewProps>(
  ({ content, className }, ref) => {
    const [debouncedContent, setDebouncedContent] = useState(content);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedContent(content);
      }, 300);

      return () => clearTimeout(timer);
    }, [content]);

    return (
      <div ref={ref} className={cn('markdown-preview max-w-full overflow-x-auto', className)}>
        <div className="max-w-[800px] mx-auto">
          <ReactMarkdown
            className={cn(
              'prose dark:prose-invert max-w-none',
              'prose-headings:scroll-mt-20',
              'prose-pre:bg-muted prose-pre:p-0',
              'prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm',
              'prose-pre:not-prose-code:bg-transparent',
              'prose-img:max-w-full prose-img:h-auto',
              'prose-pre:max-w-full prose-pre:overflow-x-auto'
            )}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  properties: {
                    className: ['anchor'],
                  },
                },
              ],
              [rehypePrettyCode, options],
            ]}
          >
            {debouncedContent}
          </ReactMarkdown>
        </div>
      </div>
    );
  }
);

MarkdownPreview.displayName = 'MarkdownPreview';

export { MarkdownPreview }; 