'use client'

export default function NotFound({
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <main className="min-h-full w-full max-w-prose mx-auto px-4 sm:px-0 text-center flex flex-col items-center">
      <h2 className="font-bold text-4xl mt-6">Oops!</h2>
      <h3 className="font-bold text-2xl mt-2">An error has occurred!</h3>
      <button
        type="button"
        onClick={() => reset()}
        className="px-4 py-1.5 rounded-lg bg-slate-600 text-white font-bol text-xl mt-6 inline-block"
      >
        Try again
      </button>

      <a
        href="/"
        className="px-4 py-1.5 rounded-lg bg-slate-300 text-slate-700 font-bol text-xl mt-2 inline-block"
      >
        Go home
      </a>
    </main>
  )
}
