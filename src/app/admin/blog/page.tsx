import { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import BlogAdminClient from './blog-admin-client'

export const metadata: Metadata = {
  title: 'Blog Admin | Daniel Lima',
  description: 'Manage your blog posts',
}

// Make the page dynamic to prevent caching
export const dynamic = 'force-dynamic'

export default async function BlogAdminPage() {
  const posts = await getAllPosts()
  console.log(posts.map((post) => post.slug))
  return <BlogAdminClient initialPosts={posts} />
} 