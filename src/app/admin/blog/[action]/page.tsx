import React from 'react'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'
import { getPostBySlug } from '@/lib/blog'
import BlogPostForm from '@/components/blog/blog-post-form'

export const metadata: Metadata = {
  title: 'Edit Blog Post | Daniel Lima',
  description: 'Edit your blog post',
}

interface Props {
  params: {
    action: string
    slug?: string
  }
}

export default async function EditBlogPostPage({ params }: Props) {
  const isEdit = params.action === 'edit'
  const post = isEdit && params.slug ? await getPostBySlug(params.slug) : null

  return (
    <section className="relative w-full min-h-screen py-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          asChild 
          variant="ghost" 
          className="mb-8"
        >
          <a href="/admin/blog">
            <ArrowLeftIcon className="mr-2 size-4" />
            Back to Admin
          </a>
        </Button>

        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          {isEdit ? 'Edit Post' : 'New Post'}
        </h1>

        <BlogPostForm post={post} />
      </div>
    </section>
  )
} 