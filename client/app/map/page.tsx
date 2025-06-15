'use client';
import {useEffect, useState} from 'react';
import {FeatureCollection} from 'geojson';
import {Bell as BellIcon} from 'lucide-react';
import Map from './Mapbox'
export default function Home() {
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
  const [Resturants, setResturants] = useState<FeatureCollection | null>(null);
  const getMeusams = () => {
    fetch('/Chemnitz.json') // ✅ Make sure Chemnitz.json is in the public folder
      .then((res) => res.json())
      .then((data) => {
        console.log(data.features);
        const filtered = data.features.filter(
          (f: any) => f?.properties?.tourism === 'museum'
        );

        const filteredResturants = data.features.filter(
          (f: any) => f?.properties?.amenity === 'restaurant'
        );
        setResturants({
          type: 'FeatureCollection',
          features: filteredResturants,
        });
        setGeoData({
          type: 'FeatureCollection',
          features: filtered,
        });

        const filteredthearter = data.features.filter(
          (f: any) => f?.properties?.amenity === 'theatre'
        );

        console.log(filteredthearter, 'filtered theatre');
      });
  };

  useEffect(() => {
    getMeusams();
  }, []);

  return (
    <div className="flex items-center justify-between w-ful flex-col">
      <div className="flex items-center justify-between w-full p-1 px-6 bg-white
       border-2 border-gray-100 shadow-sm shadow-gray-200">
        <span className="font-bold">Map</span>
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <BellIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
        {Resturants && (
          <div className="w-full">
            {' '}
            <Map geoData={Resturants} />{' '}
          </div>
        )}
    </div>
  );
}
