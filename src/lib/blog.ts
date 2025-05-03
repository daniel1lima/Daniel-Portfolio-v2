import { prisma } from './blog/prisma'

export interface BlogPost {
  id: string
  title: string
  slug: string
  description: string
  content: string
  published: boolean
  createdAt: string
  updatedAt: string
  author: string
  tags: string[]
}

export async function getAllPosts(published: boolean = false): Promise<BlogPost[]> {
  const posts = await prisma.post.findMany({
    where: published ? { published: true } : {},
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      tags: true,
    },
  })

  return posts.map(post => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    tags: post.tags.map(tag => tag.name),
  }))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // Decode the slug to handle URL-encoded characters like spaces
  const decodedSlug = decodeURIComponent(slug)
  
  const post = await prisma.post.findUnique({
    where: {
      slug: decodedSlug,
    },
    include: {
      tags: true,
    },
  })

  if (!post) {
    return null
  }

  return {
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    tags: post.tags.map(tag => tag.name),
  }
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await prisma.post.findMany({
    where: {
      tags: {
        some: {
          name: tag,
        },
      },
    },
    include: {
      tags: true,
    },
  })

  return posts.map(post => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    tags: post.tags.map(tag => tag.name),
  }))
}

export async function getAllTags(): Promise<string[]> {
  const tags = await prisma.tag.findMany({
    select: {
      name: true,
    },
  })
  return tags.map(tag => tag.name)
}

export async function createPost(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'tags'> & { tags: string[] }): Promise<BlogPost> {
  const post = await prisma.post.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      content: data.content,
      published: data.published,
      author: data.author,
      tags: {
        connectOrCreate: data.tags.map(tag => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
    include: {
      tags: true,
    },
  })

  return {
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    tags: post.tags.map(tag => tag.name),
  }
}

export async function updatePost(id: string, data: Partial<Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'tags'> & { tags?: string[] }>): Promise<BlogPost> {
  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      ...data,
      tags: data.tags ? {
        set: [],
        connectOrCreate: data.tags.map(tag => ({
          where: { name: tag },
          create: { name: tag },
        })),
      } : undefined,
    },
    include: {
      tags: true,
    },
  })

  return {
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    tags: post.tags.map(tag => tag.name),
  }
}

export async function deletePost(id: string): Promise<void> {
  await prisma.post.delete({
    where: {
      id,
    },
  })
} 