export default async function Loading() {
  return (
    <main className="min-h-full w-full max-w-5xl mx-auto p-6 flex flex-col gap-6">
      <div className="flex gap-2 justify-end animate-pulse">
        <div className="w-52 rounded-lg bg-gray-200 h-9" />
        <div className="w-36 rounded-lg bg-gray-200 h-9" />
        <div className="w-20 rounded-lg bg-gray-200 h-9" />
      </div>

      {/*<SearchForm categories={categories} />*/}
      <section className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {[...new Array(18)].map((_, i) => (
          <SkeletonBlogTile key={i} />
        ))}
      </section>
      {/*<Pagination pages={pages} page={page} />*/}
    </main>
  )
}

export const SkeletonBlogTile = () => (
  <article className="transform transition shadow rounded-lg overflow-clip animate-pulse">
    <figure className="w-full h-36 relative bg-gray-200" />
    <section className="flex flex-col p-4">
      <div className="h-3 bg-gray-200 rounded-full mb-4" />
      <div className="h-2 bg-gray-200 rounded-full mb-2.5" />
      <div className="h-2 bg-gray-200 rounded-full mb-2.5" />
      <div className="h-2 bg-gray-200 rounded-full" />
    </section>
  </article>
)
