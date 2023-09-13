import { NextRequest, NextResponse } from 'next/server'
import { z, ZodError } from 'zod'

import { posts, categories } from '@/utils/data.json'
import { mapPostCategories } from '@/app/api/posts/[slug]/route'

const paramSchema = {
  skip: z.number().gte(0).finite().safe().optional().default(0),
  take: z.number().gte(1).finite().safe().optional().default(20),
  query: z.string().trim().optional(),
  categories: z.array(z.number().gte(0)).optional(),
}

const getParamGenerator = (request: NextRequest) => (name: string) => {
  const param = request.nextUrl.searchParams.get(name)
  return param == null ? undefined : param
}

export async function GET(request: NextRequest) {
  const getParam = getParamGenerator(request)
  try {
    const categoriesQuery = paramSchema.categories.parse(getParam('categories'))
    const query = paramSchema.query.parse(getParam('q'))
    const skip = paramSchema.skip.parse(getParam('skip'))
    const take = paramSchema.take.parse(getParam('take'))

    let data = posts
    if (categoriesQuery) {
      data = data.filter((post) =>
        post.categories.some((category) => categoriesQuery.includes(category)),
      )
    }
    if (query) {
      data = data.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase()),
      )
    }

    const sliced = data.slice(skip, skip + take)
    // map categories
    const mappedPosts = sliced.map(mapPostCategories)

    return NextResponse.json({
      posts: mappedPosts,
      skip,
      take,
      length: data.length,
    })
  } catch (e: unknown) {
    const { errors } = e as { errors: ZodError[] }
    return new NextResponse(errors.map((e) => e.message).join(', '), {
      status: 400,
    })
  }
}
