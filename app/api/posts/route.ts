import { NextRequest, NextResponse } from 'next/server'
import { z, ZodError } from 'zod'

import { posts } from '@/utils/data.json'
import { mapPostCategories } from '@/app/api/posts/[slug]/route'

const paramSchema = {
  page: z.coerce.number().gte(1).finite().safe().optional().default(1),
  query: z.coerce.string().trim().optional(),
  category: z.coerce.string().trim().optional(),
}

const getParamGenerator = (request: NextRequest) => (name: string) => {
  const param = request.nextUrl.searchParams.get(name)
  return param == null ? undefined : param
}

const PAGE_SIZE = 18

export async function GET(request: NextRequest) {
  const getParam = getParamGenerator(request)
  try {
    const category = paramSchema.category.parse(getParam('category'))
    const query = paramSchema.query.parse(getParam('q'))
    const page = paramSchema.page.parse(getParam('page'))

    let list = posts.map(mapPostCategories)
    if (category) {
      list = list.filter((post) =>
        post.categories.some(({ slug }) => slug === category),
      )
    }
    if (query) {
      list = list.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase()),
      )
    }

    const skip = (page - 1) * PAGE_SIZE

    return NextResponse.json({
      posts: list.slice(skip, skip + PAGE_SIZE),
      page,
      pages: Math.floor(list.length / PAGE_SIZE) + 1,
    })
  } catch (e: unknown) {
    const { errors } = e as { errors: ZodError[] }
    return new NextResponse(errors.map((e) => e.message).join(', '), {
      status: 400,
    })
  }
}
