import { Post, SETTINGS } from '@/utils/settings'
import { BlogTile } from '@/components/BlogTile'
import { SearchForm } from '@/components/SearchForm'
import { categories } from '@/utils/data.json'
import { Pagination } from '@/components/Pagination'

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

export default async function Home({
  searchParams,
}: {
  searchParams?: { q?: string; category?: string; page?: string }
}) {
  const queryString = getQueryString(searchParams)

  const { posts, page, pages } = await fetch(
    `${SETTINGS.root}/api/posts${queryString}`,
  ).then<{
    posts: Post[]
    page: number
    pages: number
  }>((res) => res.json())

  return (
    <main className="min-h-full w-full max-w-5xl mx-auto p-6 flex flex-col gap-6">
      <SearchForm categories={categories} />
      <section className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post) => (
          <BlogTile key={post.id} post={post} />
        ))}
      </section>
      <Pagination pages={pages} page={page} />
    </main>
  )
}
