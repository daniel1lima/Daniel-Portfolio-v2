'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PlusIcon, PencilIcon, TrashIcon, SearchIcon } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { DeletePostDialog } from '@/components/blog/delete-post-dialog'
import type { BlogPost } from '@/lib/blog'
import Link from 'next/link'

interface BlogAdminClientProps {
  initialPosts: BlogPost[]
}

export default function BlogAdminClient({ initialPosts }: BlogAdminClientProps) {
  const router = useRouter()
  const [posts] = React.useState(initialPosts)

  // Get unique tags for filter
  const tags = Array.from(new Set(posts.flatMap(post => post.tags)))

  // Add effect to refresh data when posts change
  React.useEffect(() => {
    router.refresh()
  }, [router])

  return (
    <section className="relative w-full min-h-screen py-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold">Blog Admin</h1>
          <Button asChild>
            <a href="/admin/blog/new">
              <PlusIcon className="mr-2 size-4" />
              New Post
            </a>
          </Button>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">No posts found</h2>
          </div>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <div 
                key={post.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800"
              >
                <div>
                  <Link className="text-xl font-semibold hover:text-purple-600" href={`/blog/${post.slug}`}>{post.title}</Link>
                  <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
                  <div className="flex gap-2 mt-2">
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
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" asChild>
                    <a href={`/admin/blog/edit/${post.slug}`}>
                      <PencilIcon className="size-4" />
                    </a>
                  </Button>
                  <DeletePostDialog post={post}>
                    <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600">
                      <TrashIcon className="size-4" />
                    </Button>
                  </DeletePostDialog>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
} 