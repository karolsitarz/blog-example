import { Category } from '@/utils/settings'

export const CategoryBadges = ({ categories }: { categories: Category[] }) => (
  <div className="flex flex-wrap gap-1">
    {categories.map((category) => (
      <div
        key={category.id}
        className="text-xs px-2 py-1 leading-none whitespace-nowrap font-bold rounded-full bg-slate-200 text-slate-700"
      >
        {category.name}
      </div>
    ))}
  </div>
)
