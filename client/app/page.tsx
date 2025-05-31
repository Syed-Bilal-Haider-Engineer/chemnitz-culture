'use client';
import Map from './components/Mapbox';
import {useEffect, useState} from 'react';
import {FeatureCollection} from 'geojson';
import { features } from 'process';
export default function Home() {
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
  const [Resturants,setResturants] = useState<FeatureCollection | null>(null);
  const getMeusams = () => {
     fetch('/Chemnitz.json') // ✅ Make sure Chemnitz.json is in the public folder
      .then((res) => res.json())
      .then((data) => {
        console.log(data.features.length);
        const filtered = data.features.filter(
          (f: any) => f?.properties?.tourism === 'museum'
        );

        const filteredResturants = data.features.filter(
          (f: any) => f?.properties?.amenity === 'restaurant'
        );
        setResturants({
          type:'FeatureCollection',
          features:filteredResturants
        })
        setGeoData({
          type: 'FeatureCollection',
          features: filtered,
        });

         const filteredthearter = data.features.filter(
          (f: any) => f?.properties?.amenity === 'theatre'
        );

      console.log(filteredthearter,"filtered theatre")
      });
  }

  useEffect(() => {
    getMeusams();
  }, []);
    
  return (
    <div>
      {Resturants && <Map geoData={Resturants} />}
      <footer>
        <h1>Syed Bilal Haider</h1>
      </footer>
    </div>
  );
}
