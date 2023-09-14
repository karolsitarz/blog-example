import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-full w-full max-w-prose mx-auto px-4 sm:px-0 text-center">
      <h2 className="font-bold text-4xl mt-6">Oops!</h2>
      <h3 className="font-bold text-2xl mt-2">This page does not exist</h3>
      <Link
        href="/"
        className="px-4 py-1.5 rounded-lg bg-slate-600 text-white font-bol mr-auto text-xl mt-6 inline-block"
      >
        Go home
      </Link>
    </main>
  )
}
