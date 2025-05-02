import type { Metadata } from 'next'
import { Header } from '@/components/sections'
import { BlogProviders } from '@/components/blog-providers'

export const metadata: Metadata = {
  title: 'Admin | Daniel Lima',
  description: 'Admin dashboard for managing content.',
}

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <BlogProviders>
      <div className="flex min-h-[100dvh] flex-col" style={{ scrollBehavior: 'auto' }}>
        <Header />
        {children}
      </div>
    </BlogProviders>
  )
} 