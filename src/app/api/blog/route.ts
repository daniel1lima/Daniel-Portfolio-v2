import { NextResponse } from 'next/server'
import { createPost, deletePost, updatePost } from '@/lib/blog/data'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const post = await createPost(data)
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { slug, ...data } = await request.json()
    const post = await updatePost(slug, data)
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { slug } = await request.json()
    const post = await deletePost(slug)
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
} 