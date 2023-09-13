'use client'
export const SearchForm = () => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <form onSubmit={handleFormSubmit} className="flex">
      <input
        type="search"
        placeholder="Search for posts..."
        className="px-2 py-1 rounded-lg border-2 border-gray-200 bg-white focus:border-gray-400 transition outline-0 ml-auto"
        name="search"
      />
    </form>
  )
}
