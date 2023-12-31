import { Post } from '@/utils/settings'
import Link from 'next/link'
import { CategoryBadges } from '@/components/CategoryBadges'
import { ImageWithFallback } from '@/components/ImageWithFallback'

export const BlogTile = ({ post }: { post: Post }) => (
  <Link key={post.id} href={`/post/${post.slug}`} className="block">
    <article className="transform transition hover:-translate-y-1 cursor-pointer shadow-xl rounded-lg overflow-clip h-full bg-white">
      <figure className="w-full h-36 relative bg-gray-200">
        <ImageWithFallback
          src={post.imageUrl}
          alt="Post thumbnail"
          fill
          className="absolute w-full h-full left-0 top-0 object-cover"
        />
      </figure>
      <section className="flex flex-col gap-2 p-4">
        <h3 className="font-bold text-lg leading-tight">{post.title}</h3>
        <CategoryBadges categories={post.categories} />
        <p className="text-sm">{post.excerpt}</p>
      </section>
    </article>
  </Link>
)
