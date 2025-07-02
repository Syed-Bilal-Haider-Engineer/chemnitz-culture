'use client'
import { useEffect, useMemo, useState } from 'react'
import { Shapes, ChevronDown } from 'lucide-react'

export default function CategorySelect({
  onSelect,
}: {
  onSelect?: (category: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  const categories = useMemo(() => ['museum', 'restaurant', 'theatre', 'artwork'], []);

useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest('#category-dropdown')) {
      setOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

  const handleCategorySelect = (category: string) => {
    setSelected(() => category)
    setOpen(() => false);
    if (onSelect) onSelect(category)
  }

  return (
    <div className='relative'  id="category-dropdown" role="listbox">
      <button
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select category"
        onClick={() => setOpen(!open)}
        className='flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow hover:bg-gray-100 transition'
      >
        <Shapes className='w-4 h-4 text-green-600' />
        <span className='text-sm font-medium text-gray-700'>
          {selected
            ? selected.charAt(0).toUpperCase() + selected.slice(1)
            : 'Select Category'}
        </span>
        <ChevronDown className='w-4 h-4 text-green-500' />
      </button>

      {open && (
        <div className='absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg'>
          {categories.map((cat) => (
            <div
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
