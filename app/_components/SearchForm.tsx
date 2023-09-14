'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Category, SETTINGS } from '@/utils/settings'
import { useEffect, useState } from 'react'

export const SearchForm = ({ categories }: { categories: Category[] }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '')
  const [categoryInput, setCategoryInput] = useState(
    searchParams.get('category') || '',
  )

  // make sure the inputs are aligned with query parameters
  useEffect(() => {
    setSearchInput(searchParams.get('q') || '')
    setCategoryInput(searchParams.get('category') || '')
  }, [searchParams])

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams(Array.from(searchParams.entries()))

    if (!searchInput) params.delete('q')
    else params.set('q', searchInput)

    if (!categoryInput) params.delete('category')
    else params.set('category', categoryInput)

    params.delete('page')

    const search = params.toString()
    const queryString = search ? `?${search}` : ''
    router.replace(`${SETTINGS.root}${queryString}`)
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col sm:flex-row gap-2 rounded-xl bg-white p-2"
    >
      <input
        type="search"
        title="Search"
        placeholder="Search for posts..."
        className="px-2 py-1 rounded-lg border-2 border-gray-200 bg-white focus:border-gray-400 transition outline-0 ml-auto w-full sm:w-auto"
        name="search"
        defaultValue={searchParams.get('q') || ''}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        aria-label="Post search field"
      />
      <label className="rounded-lg border-2 border-gray-200 bg-white focus-within::border-gray-400 transition relative">
        <span className="absolute top-0.5 left-2.5 text-xs font-bold text-slate-400">
          Category
        </span>
        <select
          name="category"
          title="Category"
          className="outline-0 w-full bg-transparent pl-1.5 pr-3 pb-0.5 pt-3"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          aria-label="Post category filter selector"
        >
          <option value="">None</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <button className="px-4 py-1.5 rounded-lg bg-slate-600 text-white font-bold">
        Search
      </button>
    </form>
  )
}
