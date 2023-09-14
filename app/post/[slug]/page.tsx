import { Post, SETTINGS } from '@/utils/settings'
import { CategoryBadges } from '@/components/CategoryBadges'
import { notFound } from 'next/navigation'
import { ImageWithFallback } from '@/components/ImageWithFallback'

export default async function Post({ params }: { params: { slug: string } }) {
  const res = await fetch(`${SETTINGS.root}/api/posts/${params.slug}`)
  if (res.status === 404) return notFound()
  if (!res.ok) throw new Error('An error has occurred')

  const post = (await res.json()) as Post

  return (
    <main className="min-h-full w-full max-w-prose mx-auto px-4 sm:px-0">
      <figure className="w-full h-48 sm:h-52 md:h-64 relative rounded-xl overflow-clip mt-4">
        <ImageWithFallback
          className="absolute w-full h-full left-0 top-0 object-cover"
          src={post.imageUrl}
          alt="Post thumbnail"
          fill
        />
      </figure>
      <h2 className="font-bold text-2xl mt-6 mb-2">{post.title}</h2>
      <CategoryBadges categories={post.categories} />
      <p className="mt-6">{post.excerpt}</p>
    </main>
  )
}
