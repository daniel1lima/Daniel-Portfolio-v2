import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/blog'
import BlogPostForm from '@/components/blog/blog-post-form'

export const metadata: Metadata = {
  title: 'Edit Post | Daniel Lima',
  description: 'Edit your blog post',
}

export default async function EditBlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <section className="relative w-full min-h-screen py-20 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Edit Post</h1>
        <BlogPostForm post={post} />
      </div>
    </section>
  )
} 