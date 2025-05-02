'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import type { BlogPost } from '@/lib/blog'

interface Props {
  post?: BlogPost | null
}

export default function BlogPostForm({ post }: Props) {
  const router = useRouter()
  const isEdit = !!post
  const [loading, setLoading] = React.useState(false)
  const [title, setTitle] = React.useState(post?.title || '')
  const [slug, setSlug] = React.useState(post?.slug || '')
  const [description, setDescription] = React.useState(post?.description || '')
  const [content, setContent] = React.useState(post?.content || '')
  const [published, setPublished] = React.useState(post?.published || false)
  const [tags, setTags] = React.useState(post?.tags.join(', ') || '')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const data = {
      title,
      slug,
      description,
      content,
      published,
      author: 'Daniel Lima',
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
    }

    try {
      const response = await fetch(`/api/blog${isEdit ? `/${post.slug}` : ''}`, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/admin/blog')
        router.refresh()
      }
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Failed to submit post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            pattern="[a-z0-9-]+"
            title="Only lowercase letters, numbers, and hyphens are allowed"
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="content">Content (Markdown)</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="min-h-[400px] font-mono"
          />
        </div>
        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. technology, programming, web development"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="published"
            checked={published}
            onCheckedChange={setPublished}
          />
          <Label htmlFor="published">Published</Label>
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/blog')}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  )
} 