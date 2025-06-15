// components/SearchBar.tsx
"use client";
import { useState } from "react";
import { Search, MapPin } from "lucide-react";

const mockLocations = [
  {
    id: 1,
    title: "Chemnitz Museum",
    description: "Local history and art museum",
    icon: <MapPin size={16} className="text-blue-500" />,
  },
  {
    id: 2,
    title: "City Center",
    description: "Main shopping and business district",
    icon: <MapPin size={16} className="text-blue-500" />,
  },
  {
    id: 3,
    title: "Kassberg District",
    description: "Historic neighborhood with classic architecture",
    icon: <MapPin size={16} className="text-blue-500" />,
  },
];

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = mockLocations.filter((location) =>
      location.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="absolute top-4 left-5.5 z-10 w-[300px]">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search locations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-8 pr-4 py-2 text-sm border border-gray-300 rounded-full shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Search size={16} className="absolute left-2 top-2.5 text-gray-400" />
      </form>

      {searchResults.length > 0 && (
        <div className="mt-2 bg-white rounded-lg shadow-lg p-2 max-h-60 overflow-y-auto">
          {searchResults.map((location) => (
            <div
              key={location.id}
              className="p-2 rounded hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                console.log("Selected:", location.title);
                setSearchQuery("");
                setSearchResults([]);
              }}
            >
              <div className="flex items-start gap-2">
                {location.icon}
                <div>
                  <p className="text-sm font-medium">{location.title}</p>
                  <p className="text-xs text-gray-500">{location.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
