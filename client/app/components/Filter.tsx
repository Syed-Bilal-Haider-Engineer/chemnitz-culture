'use client';
import { useState } from 'react';
import { Shapes, ChevronDown } from 'lucide-react';

export default function CategorySelect({ onSelect }: { onSelect?: (category: string) => void }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const categories = ['museum', 'restaurant', 'theatre', 'artwork'];

  const handleSelect = (category: string) => {
    setSelected(category);
    setOpen(false);
    if (onSelect) onSelect(category);
  };

  return (
    <div className="absolute top-4 right-4 flex gap-2 z-10">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow hover:bg-gray-100 transition"
        >
          <Shapes className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            {selected ? selected.charAt(0).toUpperCase() + selected.slice(1) : 'Select Category'}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
            {categories.map((cat) => (
              <div
                key={cat}
                onClick={() => handleSelect(cat)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
