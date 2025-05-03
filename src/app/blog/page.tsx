import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowUpRightIcon } from 'lucide-react'
import { getAllPosts } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = {
  title: 'Blog | Daniel Lima',
  description: 'Thoughts, tutorials, and insights on technology, business, and data science.',
}

const POSTS_PER_PAGE = 6

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const currentPage = Number(searchParams.page) || 1
  const posts = await getAllPosts(true)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  return (
    <section className="relative w-full min-h-screen py-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Blog</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
          Thoughts, tutorials, and insights on technology, business, and data science.
        </p>
        
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">No posts yet</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Check back soon for new content!
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-8">
              {paginatedPosts.map((post) => (
                <article 
                  key={post.id}
                  className="group p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300"
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-semibold group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <time className="text-sm text-gray-500">
                        {formatDate(post.createdAt)}
                      </time>
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button 
                      asChild 
                      variant="ghost" 
                      className="mt-4 self-start group-hover:text-purple-600"
                    >
                      <Link href={`/blog/${post.slug}`}>
                        Read more <ArrowUpRightIcon className="ml-2 size-4" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    asChild
                  >
                    <Link href={`/blog?page=${page}`}>{page}</Link>
                  </Button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
} 