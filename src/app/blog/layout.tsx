import type { Metadata } from 'next'
import { Header } from '@/components/sections'
import { BlogProviders } from '@/components/blog-providers'

export const metadata: Metadata = {
  title: 'Blog | Daniel Lima',
  description: 'Read my thoughts on technology, programming, and more.',
}

export default function BlogLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 ">
        <div className="max-w-[1200px] mx-auto">
          <BlogProviders>
            <div className="flex min-h-[100dvh] flex-col" style={{ scrollBehavior: 'auto' }}>
              <Header />
              {children}
            </div>
          </BlogProviders>
        </div>
      </div>
    </div>
  )
} 