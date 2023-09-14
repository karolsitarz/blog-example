'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { SETTINGS } from '@/utils/settings'

export const Pagination = ({
  pages,
  page,
}: {
  pages: number
  page: number
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const setPage = (page: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    params.set('page', page.toString())

    const search = params.toString()
    const queryString = search ? `?${search}` : ''
    router.replace(`${SETTINGS.root}${queryString}`)
  }

  return (
    <div className="flex">
      {page > 1 && (
        <button
          className="px-3 py-1.5 rounded-lg bg-slate-600 text-white font-bol mr-auto"
          onClick={() => setPage(page - 1)}
        >
          Previous page
        </button>
      )}
      {page < pages && (
        <button
          className="px-3 py-1.5 rounded-lg bg-slate-600 text-white font-bold ml-auto"
          onClick={() => setPage(page + 1)}
        >
          Next page
        </button>
      )}
    </div>
  )
}
