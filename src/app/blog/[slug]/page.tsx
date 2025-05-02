import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, Divide } from 'lucide-react';
import { getPostBySlug } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { ShareButtons } from '@/components/blog/share-buttons';
import { MarkdownContentWrapper } from '@/components/blog/markdown-content-wrapper';

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found'
    };
  }

  return {
    title: `${post.title} | Daniel Lima's Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.createdAt,
      authors: [post.author],
      tags: post.tags
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description
    }
  };
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default async function BlogPostPage({
  params
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);
  const shareUrl = `${process.env.NEXT_PUBLIC_URL}/blog/${post.slug}`;

  return (
    <article className="relative min-h-screen w-full px-4 py-20 md:px-4">
      <div className="mx-10 max-w-3xl">
        <Button asChild variant="ghost" className="mb-8">
          <a href="/blog">
            <ArrowLeftIcon className="mr-2 size-4" />
            Back to Blog
          </a>
        </Button>

        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
            <span>{post.author}</span>
            <span>•</span>
            <time>{formatDate(post.createdAt)}</time>
            <span>•</span>
            <span>{readingTime} min read</span>
          </div>
          <div className="mt-4 flex gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-600 dark:bg-purple-900 dark:text-purple-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="flex gap-8">
          <div className="w-56 lg:block sticky top-0">
            <TableOfContents content={post.content} />
          </div>
          
          <div className="border-l border-gray-200 dark:border-gray-800"></div>

          <div className="flex-1">
            <MarkdownContentWrapper content={post.content} />
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
          <ShareButtons
            title={post.title}
            description={post.description}
            url={shareUrl}
          />
        </div>
      </div>
    </article>
  );
}
