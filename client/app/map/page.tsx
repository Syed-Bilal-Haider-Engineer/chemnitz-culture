// app/map/page.tsx
'use client';
import {Bell as BellIcon, ChevronDown, ListFilterPlus, Shapes} from 'lucide-react';
import dynamic from 'next/dynamic';
import {useCallback, useEffect, useState} from 'react';
import {useMapData} from '../Hooks/useMapData';
import {FeatureCollection} from 'geojson';
import CategorySelect from '../components/Filter';


const Map = dynamic(() => import('./Mapbox'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[calc(100vh-40px)] bg-gray-100 flex items-center justify-center">
      Loading map...
    </div>
  ),
});


const Search = dynamic(() => import('../components/SearchBar'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[calc(100vh-40px)] bg-gray-100 flex items-center justify-center">
      Loading search...
    </div>
  ),
});

export default function MapPage() {
   const { loading, error, fetchData } = useMapData();
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);

  // Initial data load
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData('features');
      if (data) setGeoData(data);
    };
    loadData();
  }, [fetchData]);

  const handleSearch = useCallback(async (endpoint: string, query: string) => {
    const data = await fetchData(endpoint, query);
    if (data) {
      console.log('Search results:', data);
      setGeoData(data);
    }
  }, [fetchData]);

  if (error) return <div>Error: {error}</div>;

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const categories = ['museum', 'restaurant', 'theatre', 'artwork'];

  const handleSelect = (category: string) => {
    setSelected(category);
    setOpen(false);
  };


  return (
    <div className="flex flex-col w-full">
      <header className="flex items-center justify-between w-full p-4 bg-white border-b border-gray-200 shadow-sm">
        <h1 className="font-bold text-lg">Map</h1>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <BellIcon className="w-5 h-5 text-gray-600" />
        </button>
      </header>

      <div className="relative flex-1">
        <div id="map" className="relative">
          <Search searchHanlde={handleSearch} geoData={geoData}/>
          <Map
            geoData={geoData}
             key={JSON.stringify(geoData)}
          />
           <CategorySelect onSelect={(category) => console.log("Selected:", category)} />

          {/* <div className="absolute top-4 right-4 flex gap-2 z-10"> */}
            {/* <button className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow hover:bg-gray-100 transition">
              <Shapes className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Select Category
              </span>
            </button> */}
            {/* <button className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow hover:bg-gray-100 transition">
              <ListFilterPlus className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Select Filter
              </span>
            </button> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
