import { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import BlogAdminClient from './blog-admin-client'

export const metadata: Metadata = {
  title: 'Blog Admin | Daniel Lima',
  description: 'Manage your blog posts',
}

export default async function BlogAdminPage() {
  const posts = await getAllPosts()
  return <BlogAdminClient initialPosts={posts} />
} 