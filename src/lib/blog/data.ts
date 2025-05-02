import { prisma } from './prisma'
import type { Post, Tag } from '../../generated/prisma'

export type { Post, Tag }

export type BlogPost = Post & {
  tags: Tag[]
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return prisma.post.findMany({
    include: {
      tags: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return prisma.post.findUnique({
    where: { slug },
    include: {
      tags: true
    }
  })
}

export async function createPost(data: {
  title: string
  slug: string
  description: string
  content: string
  author: string
  tags: string[]
}): Promise<BlogPost> {
  const { tags, ...postData } = data
  
  return prisma.post.create({
    data: {
      ...postData,
      tags: {
        connectOrCreate: tags.map(tag => ({
          where: { name: tag },
          create: { name: tag }
        }))
      }
    },
    include: {
      tags: true
    }
  })
}

export async function updatePost(
  slug: string,
  data: {
    title?: string
    description?: string
    content?: string
    published?: boolean
    tags?: string[]
  }
): Promise<BlogPost | null> {
  const { tags, ...postData } = data

  return prisma.post.update({
    where: { slug },
    data: {
      ...postData,
      ...(tags && {
        tags: {
          set: [],
          connectOrCreate: tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      })
    },
    include: {
      tags: true
    }
  })
}

export async function deletePost(slug: string): Promise<BlogPost | null> {
  return prisma.post.delete({
    where: { slug },
    include: {
      tags: true
    }
  })
}

export async function getAllTags(): Promise<Tag[]> {
  return prisma.tag.findMany({
    orderBy: {
      name: 'asc'
    }
  })
} 