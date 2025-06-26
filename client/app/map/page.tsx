'use client';
import dynamic from 'next/dynamic';
import {useCallback, useEffect, useState} from 'react';
import type {FeatureCollection} from 'geojson';
import CategorySelect from '../components/Filter';
import { useContextAPI } from '../context/contextAPI';
import { getAllPlaces, searchPlacesByKeyword } from '../services/mapService';
import { useQuery } from '@tanstack/react-query';

const Map = dynamic(() => import('./Mapbox'), {ssr: false});
const SearchBar = dynamic(() => import('../components/SearchBar'), {
  ssr: false,
});

export default function MapPage() {
  const {isLogin, isSignUp, isProfile} = useContextAPI()

    const {
  data,
  isLoading,
  isError,
} = useQuery<FeatureCollection, Error>({
  queryKey: ["allPlaces"],
  queryFn: getAllPlaces,
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
});

// This state will hold data for display (initial or search)
const [geoData, setGeoData] = useState<FeatureCollection | null>(null);

// Set geoData when query data loads
useEffect(() => {
  if (data) setGeoData(data);
}, [data]);

// Update geoData when search is used
const handleSearch = useCallback(
  async (query: string) => {
    const result = await searchPlacesByKeyword(query);
    setGeoData(result);
  },
  [searchPlacesByKeyword]
);

const handleCategeries = async(category:string) => {
    const result = await searchPlacesByKeyword(category);
    setGeoData(result);
}

  return (
    <div className="flex w-full h-[calc(100vh-40px)]">
  
      <div className={`w-[250px] bg-white border-r border-green-200 shadow-md rounded-r-2xl 
        ${ !isLogin || !isSignUp || !isProfile && 'z-10' } `}>
        {geoData && <SearchBar geoData={geoData} searchHanlde={handleSearch} />}
      </div>
      <div className="flex-1 relative p-1">
        <div
          className="w-full rounded-2xl  shadow-lg overflow-hidden"
          style={{boxShadow: '0 4px 12px rgba(0, 128, 0, 0.1)'}}
        >
          <Map geoData={geoData} key={JSON.stringify(geoData)} />
          <CategorySelect
            onSelect={handleCategeries}
          />
        </div>
      </div>
    
    </div>
  );
}
