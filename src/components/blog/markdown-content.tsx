'use client'

import React from 'react'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import { cn } from '@/lib/utils'

interface MarkdownContentProps {
  content: string
  className?: string
}

interface PrettyCodeNode {
  type: string
  children: Array<{ type: string; value: string }>
  properties: {
    className?: string[]
  }
}

const options = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  onVisitLine(node: PrettyCodeNode) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  onVisitHighlightedLine(node: PrettyCodeNode) {
    node.properties.className = node.properties.className || []
    node.properties.className.push('highlighted')
  },
  onVisitHighlightedWord(node: PrettyCodeNode) {
    node.properties.className = ['word']
  },
}

export async function MarkdownContent({ content, className }: MarkdownContentProps) {
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
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
      ],
    },
  })

  return (
    <div className="w-full max-w-full overflow-x-auto">
      <div className="max-w-[800px] mx-auto">
        <div
          className={cn(
            'prose dark:prose-invert max-w-none',
            'prose-headings:scroll-mt-20',
            'prose-pre:bg-muted prose-pre:p-0',
            'prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm',
            'prose-pre:not-prose-code:bg-transparent',
            'prose-img:max-w-full prose-img:h-auto',
            'prose-pre:max-w-full prose-pre:overflow-x-auto',
            className
          )}
        >
          <MDXRemote {...mdxSource} />
        </div>
      </div>
    </div>
  )
} 