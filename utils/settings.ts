export const SETTINGS = {
  root: process.env.NEXT_PUBLIC_ROOT as string,
} as const

export interface Post {
  id: number
  slug: string
  title: string
  excerpt: string
  imageUrl: string
  categories: Category[]
}

export interface Category {
  id: number
  slug: string
  name: string
}
