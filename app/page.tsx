import { Post, SETTINGS } from '@/utils/settings'
import { BlogTile } from '@/app/_components/BlogTile'
import { SearchForm } from '@/app/_components/SearchForm'
import { categories } from '@/utils/data.json'
import Link from 'next/link'

const getQueryString = (searchParams?: Record<string, string>) => {
  if (!searchParams) return ''

  const params = new URLSearchParams()
  for (const param of ['q', 'category', 'page'] as const) {
    const value = searchParams?.[param]
    if (value) params.set(param, value.toString())
  }
  const search = params.toString()
  return search ? `?${search}` : ''
}

const getPageQueryString = (page: number, queryString: string) => {
  const params = new URLSearchParams(queryString)
  params.set('page', page.toString())
  return params.toString()
}

export default async function Home({
  searchParams,
}: {
  searchParams?: { q?: string; category?: string; page?: string }
}) {
  const queryString = getQueryString(searchParams)

  const res = await fetch(`${SETTINGS.root}/api/posts${queryString}`)
  if (!res.ok) throw new Error('An error has occurred')

  const { posts, page, pages } = (await res.json()) as {
    posts: Post[]
    page: number
    pages: number
  }

  return (
    <main className="min-h-full w-full max-w-5xl mx-auto p-6 flex flex-col gap-6">
      <SearchForm categories={categories} />

      {!posts?.length ? (
        <div className="text-gray-500 text-center text-xl mx-auto">
          No posts with given parameters
        </div>
      ) : (
        <section className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post) => (
            <BlogTile key={post.id} post={post} />
          ))}
        </section>
      )}

      <div className="flex">
        {page > 1 && (
          <Link
            href={'?' + getPageQueryString(page - 1, queryString)}
            className="px-4 py-1.5 rounded-lg bg-slate-600 text-white font-bol mr-auto"
          >
            Previous page
          </Link>
        )}
        {page < pages && (
          <Link
            href={'?' + getPageQueryString(page + 1, queryString)}
            className="px-4 py-1.5 rounded-lg bg-slate-600 text-white font-bol ml-auto"
          >
            Next page
          </Link>
        )}
      </div>
    </main>
  )
}
