import { Post, SETTINGS } from '@/utils/settings'
import { BlogTile } from '@/components/BlogTile'
import { SearchForm } from '@/app/SearchForm'

export default async function Home() {
  const { posts } = await fetch(`${SETTINGS.root}/api/posts`).then<{
    posts: Post[]
    skip: number
    take: number
    length: number
  }>((res) => res.json())

  return (
    <main className="min-h-full w-full max-w-5xl mx-auto p-6 flex flex-col gap-6">
      <SearchForm />
      <section className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post) => (
          <BlogTile key={post.id} post={post} />
        ))}
      </section>
    </main>
  )
}
