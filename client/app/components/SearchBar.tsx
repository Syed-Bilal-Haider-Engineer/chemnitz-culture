'use client';

import { useState, useEffect } from 'react';
import { CornerUpRight, Search, MapPin } from 'lucide-react';
import type { Feature } from 'geojson';

interface SearchBarProps {
  geoData: any;
  searchHanlde?: (key: string, value: string) => void;
}

export default function SearchBar({ geoData, searchHanlde }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Feature[]>([]);

  // 🔹 Load initial 10 items
  useEffect(() => {
    if (geoData?.features?.length > 0) {
      setSearchResults(geoData.features.slice(0, 20));
    }
  }, [geoData]);

  // 🔍 Search filter
  const runSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();

    const results = geoData.features
      .filter((feature: any) =>
        feature?.properties?.name?.toLowerCase().includes(lowerQuery) ||
        feature?.properties?.alt_name?.toLowerCase().includes(lowerQuery) ||
        feature?.category?.toLowerCase().includes(lowerQuery)
      )
    setSearchResults(results);
  };

  // ⌨️ Handle input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === '') {
      // 🟢 Reset to first 10
      setSearchResults(geoData.features.slice(0, 10));
    } else {
      runSearch(query);
    }
  };

  const handleSelect = (label: string) => {
    if (searchHanlde) {
      searchHanlde('search', `searchKeyword=${label}`);
    }
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      setSearchQuery('');
      setSearchResults(geoData.features.slice(0, 20));
    }, 200);
  };
 console.log("searchResults=>",searchResults)
  return (
    <div className="relative w-[250px] max-w-full bg-white overflow-y-auto" style={{height:'100vh'}}>
      <div className="relative mt-3 mx-2">
        <input
          type="text"
          placeholder="Search Location"
          value={searchQuery}
          onChange={handleChange}
          onBlur={handleOnBlur}
          className="w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-sm shadow focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
        />
        <Search size={18} className="absolute left-3 top-2.5 text-green-500" />
        <CornerUpRight size={18} className="absolute right-3 top-2.5 text-green-500 cursor-pointer" />
      </div>

      {searchResults.length > 0 && (
        <div className=" rounded-lg ">
          {searchResults.map((feature: any) => {
            const label =
              feature?.properties?.name ||
              feature?.properties?.alt_name ||
              feature?.category;

            return (
             <div
                key={feature.id}
                className="flex items-center gap-2 px-3 py-3 border-b-1 border-green-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleSelect(label)}
              >
                <MapPin className="text-green-500 w-4 h-4" />
                <div className="text-gray-800 text-sm">{label}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
