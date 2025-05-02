import { NextResponse } from 'next/server'
import { prisma } from '@/lib/blog/prisma'
import { notFound } from 'next/navigation'

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const data = await request.json()
    const post = await prisma.post.update({
      where: { slug: params.slug },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        content: data.content,
        published: data.published,
        author: data.author,
        tags: {
          set: [], // First clear existing tags
          connectOrCreate: data.tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag }
          }))
        },
      },
      include: {
        tags: true
      }
    })
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await prisma.post.delete({
      where: { slug: params.slug },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
} 