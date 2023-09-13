import { Post, SETTINGS } from '@/utils/settings'
import Image from 'next/image'
import { CategoryBadges } from '@/components/CategoryBadges'

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await fetch(
    `${SETTINGS.root}/api/posts/${params.slug}`,
  ).then<Post>((res) => res.json())

  return (
    <main className="min-h-full w-full max-w-prose mx-auto px-4 sm:px-0">
      <figure className="w-full h-48 sm:h-52 md:h-64 relative rounded-xl overflow-clip mt-4">
        <Image
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
