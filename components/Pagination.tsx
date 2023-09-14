'use client'
import { useSearchParams } from 'next/navigation'
import { SETTINGS } from '@/utils/settings'
import Link from 'next/link'
import { useCallback } from 'react'

export const Pagination = ({
  pages,
  page,
}: {
  pages: number
  page: number
}) => {
  const searchParams = useSearchParams()

  const getLink = useCallback(
    (page: number) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      params.set('page', page.toString())

      const search = params.toString()
      const queryString = search ? `?${search}` : ''
      return `${SETTINGS.root}${queryString}`
    },
    [searchParams],
  )

  return (
    <div className="flex">
      {page > 1 && (
        <Link
          href={getLink(page - 1)}
          className="px-4 py-1.5 rounded-lg bg-slate-600 text-white font-bol mr-auto"
        >
          Previous page
        </Link>
      )}
      {page < pages && (
        <Link
          href={getLink(page + 1)}
          className="px-4 py-1.5 rounded-lg bg-slate-600 text-white font-bol ml-auto"
        >
          Next page
        </Link>
      )}
    </div>
  )
}
