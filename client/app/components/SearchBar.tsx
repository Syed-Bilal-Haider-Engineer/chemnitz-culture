'use client';

import {useState} from 'react';
import {Search} from 'lucide-react';
import type {Feature} from 'geojson';

interface SearchBarProps {
  geoData: any;
  searchHanlde?: (key: string, value: string) => void;
}

export default function SearchBar({geoData, searchHanlde}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Feature[]>([]);

  const runSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();

    const results = geoData.features.filter(
      (feature: any) =>
        feature?.properties?.name?.toLowerCase().includes(lowerQuery) ||
        feature?.properties?.alt_name?.toLowerCase().includes(lowerQuery) ||
        feature?.category?.toLowerCase().includes(lowerQuery)
    );

    setSearchResults(results);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
    } else {
      runSearch(query);
    }
  };

  const handleSelect = (feature: any) => {
    const name =
      feature?.properties?.name ||
      feature?.properties?.alt_name ||
      feature?.category;

    setSearchQuery(name);
    setSearchResults([]);
    console.log('Selected:', name);

    // // Optional custom search handler
    // if (searchHanlde) {
    //   searchHanlde("search", name);
    // }
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      setSearchResults([]), setSearchQuery('');
    }, 150);
  };
  return (
    <div className="absolute top-4 left-5.5 z-10 w-[300px]">
      <div className="relative">
        <input
          type="text"
          placeholder="Search locations..."
          value={searchQuery}
          onChange={handleChange}
          onBlur={handleOnBlur}
          className="w-full pl-8 pr-4 py-2 text-sm border border-gray-300 rounded-full shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Search size={16} className="absolute left-2 top-2.5 text-gray-400" />
      </div>

      {searchResults.length > 0 && (
        <div className="mt-2 bg-white rounded-lg shadow-lg p-2 max-h-60 overflow-y-auto">
          {searchResults.map((feature: any) => {
            const label =
              feature?.properties?.name ||
              feature?.properties?.alt_name ||
              feature?.category;

            return (
              <div
                key={feature.id}
                className="p-2 rounded hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(feature)}
              >
                <p className="text-sm text-black font-medium">{label}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
