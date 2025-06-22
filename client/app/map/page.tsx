'use client';
import dynamic from 'next/dynamic';
import {useCallback, useEffect, useState} from 'react';
import {useMapData} from '../Hooks/useMapData';
import type {FeatureCollection} from 'geojson';
import CategorySelect from '../components/Filter';
import LoginPage from '../(auth)/login/login';
import { useContextAPI } from '../context/contextAPI';
import SignupForm from '../(auth)/register/singup';

const Map = dynamic(() => import('./Mapbox'), {ssr: false});
const SearchBar = dynamic(() => import('../components/SearchBar'), {
  ssr: false,
});

export default function MapPage() {
  const {loading, error, fetchData} = useMapData();
  const {isLogin, isSignUp, isProfile} = useContextAPI()
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData('features');
      if (data) setGeoData(data);
    };
    loadData();
  }, [fetchData]);

  const handleSearch = useCallback(
    async (endpoint: string, query: string) => {
      const data = await fetchData(endpoint, query);
      if (data) setGeoData(data);
    },
    [fetchData]
  );

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex w-full h-[calc(100vh-40px)]">
      {/* Sidebar Search */}
      <div className={`w-[250px] bg-white border-r border-green-200 shadow-md rounded-r-2xl 
        ${ !isLogin || !isSignUp || !isProfile && 'z-10' } `}>
        {geoData && <SearchBar geoData={geoData} searchHanlde={handleSearch} />}
      </div>
      <div className="flex-1 relative p-1">
        <div
          className="w-full h-full rounded-2xl  shadow-lg overflow-hidden"
          style={{boxShadow: '0 4px 12px rgba(0, 128, 0, 0.1)'}}
        >
          <Map geoData={geoData} key={JSON.stringify(geoData)} />
          <CategorySelect
            onSelect={(category) => console.log('Selected:', category)}
          />
        </div>
      </div>
      { isLogin && <LoginPage/>}
      { isSignUp && <SignupForm/>}
    </div>
  );
}
