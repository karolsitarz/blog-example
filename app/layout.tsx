import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import NextTopLoader from 'nextjs-toploader'

const poppins = Poppins({ subsets: ['latin'], weight: ['500', '700'] })

export const metadata: Metadata = {
  title: 'Blog Example',
  description: 'Responsive blog example',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextTopLoader />
        <nav className="bg-white border-b-2 border-gray-200 px-4 py-2 sticky top-0 z-10">
          <Link href="/" className="font-bold text-xl">
            Blog
          </Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
