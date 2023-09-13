import { NextRequest, NextResponse } from 'next/server'

import { categories, posts } from '@/utils/data.json'
import { Category, Post } from '@/utils/settings'

export const mapPostCategories = (post: (typeof posts)[number]): Post => {
  const mappedCategories: Category[] = post.categories.flatMap(
    (category) => categories.find((c) => c.id === category) || [],
  )

  return {
    ...post,
    categories: mappedCategories,
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const slug = params.slug
    const data = posts.find((post) => post.slug === slug)
    if (!data)
      return new NextResponse('Post not found', {
        status: 404,
      })

    const mappedPost = mapPostCategories(data)
    return NextResponse.json(mappedPost)
  } catch (e: unknown) {
    return new NextResponse('An error ocurred. Please try again later', {
      status: 400,
    })
  }
}
