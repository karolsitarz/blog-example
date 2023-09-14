'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Category, SETTINGS } from '@/utils/settings'

export const SearchForm = ({ categories }: { categories: Category[] }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams(Array.from(searchParams.entries()))

    const formData = new FormData(e.currentTarget)
    const query = ((formData.get('search') || '') as string).trim()
    const category = ((formData.get('category') || '') as string).trim()

    if (!query) params.delete('q')
    else params.set('q', query)

    if (!category) params.delete('category')
    else params.set('category', category)

    params.delete('page')

    const search = params.toString()
    const queryString = search ? `?${search}` : ''
    router.replace(`${SETTINGS.root}${queryString}`)
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex gap-2">
      <input
        type="search"
        title="Search"
        placeholder="Search for posts..."
        className="px-2 py-1 rounded-lg border-2 border-gray-200 bg-white focus:border-gray-400 transition outline-0 ml-auto"
        name="search"
        defaultValue={searchParams.get('q') || ''}
      />
      <select
        name="category"
        title="Category"
        className="px-2 py-1 rounded-lg border-2 border-gray-200 bg-white focus:border-gray-400 transition outline-0"
        defaultValue={searchParams.get('category') || ''}
      >
        <option value="">None</option>
        {categories.map((category) => (
          <option key={category.id} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
      <button className="px-3 py-1.5 rounded-lg bg-slate-600 text-white font-bold">
        Search
      </button>
    </form>
  )
}
