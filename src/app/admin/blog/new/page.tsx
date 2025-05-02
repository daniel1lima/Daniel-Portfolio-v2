import { Metadata } from 'next'
import BlogPostForm from '@/components/blog/blog-post-form'

export const metadata: Metadata = {
  title: 'New Post | Daniel Lima',
  description: 'Create a new blog post',
}

export default function NewBlogPostPage() {
  return (
    <section className="relative w-full min-h-screen py-20 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">New Post</h1>
        <BlogPostForm />
      </div>
    </section>
  )
} 