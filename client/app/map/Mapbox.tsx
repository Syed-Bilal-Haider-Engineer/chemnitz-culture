// components/Map.tsx
'use client';
import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactDOM from 'react-dom/client';
import './Mapbox.css';
import * as turf from '@turf/turf';
import PopupCard from './PopCard';
import QueryProvider from '../services/QueryProvider';
import { useContextAPI } from '../context/contextAPI';
interface MapProps {
  geoData: any | null;
}

function Map({geoData}: MapProps) {
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);
  const {token} = useContextAPI();

  const handlePop = (feature: any): HTMLElement => {
  const container = document.createElement('div');
  const root = ReactDOM.createRoot(container);
     const label =
          feature.properties.name ||
          feature.properties.description ||
          feature.properties.artwork_type;
  root.render(
    <QueryProvider>
    <PopupCard
      id={feature.properties['@id']}
      name={label}
      token={token}
    />
    </QueryProvider>
  );

  return container; // ✅ This is required by setDOMContent()
};

  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiYmlsYWxzaGFoIiwiYSI6ImNsYjI0dHpocjAweDIzbnFlYTRvbWQydXgifQ.3Bj60LFS6nt7WYVfh3ZeNw';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [10.9214, 50.8323],
      zoom: 15,
    });

    map.current.addControl(new mapboxgl.NavigationControl());
  }, []);

  useEffect(() => {
    if (!map.current || !geoData) return;

    map.current.on('load', () => {
      if (map.current.getSource('museums')) return;

      map.current.addSource('museums', {
        type: 'geojson',
        data: geoData,
      });

      map.current.addLayer({
        id: 'museum-layer',
        type: 'circle',
        source: 'museums',
        paint: {
          'circle-radius': 15,
          'circle-color': '#5CE65C',
          'circle-stroke-width': 1,
          'circle-stroke-color': '#FFFAFA',
        },
      });

      // Fit to museum data
      const bounds = new mapboxgl.LngLatBounds();
      geoData.features.forEach((feature: any) => {
        bounds.extend(feature.geometry.coordinates);
      });
      map.current.fitBounds(bounds, {padding: 50});
      
      // Add markers separately (don't bind popups here)
        geoData.features.forEach((feature: any) => {
          const coordinates = feature.geometry.coordinates;

          new mapboxgl.Marker({ color: 'red' })
            .setLngLat(coordinates)
            .addTo(map.current);
        });

        // Handle click on map layer to show popup
        map.current.on('click', 'museum-layer', (e: any) => {
          const features = map.current.queryRenderedFeatures(e.point);

          if (!features.length) return;

          const feature = features[0];

          new mapboxgl.Popup({ offset: 30 })
            .setDOMContent(handlePop(feature)) // React popup content
            .setLngLat(feature.geometry.coordinates) // manually set position
            .addTo(map.current); // attach popup to map, not to marker
        });

      // map.current.on('click','museum-layer',(e:any) => {
      //     const features = map.current.queryRenderedFeatures(e.point);
      //     console.log("features show on click=>",features[0]?.properties)
      //      const popup = new mapboxgl.Popup({ offset: 30 }).setDOMContent(handlePop(features[0]))
      //   // .setHTML('<h1 onclick=' + { handlePop() } + '> ' + label + ' </h1>');
      // });
        
      // geoData.features.forEach((feature: any) => {
      //   const coordinates = feature.geometry.coordinates;
      //   // console.log('feature.properties==>', feature.properties);
      // //  const popup = new mapboxgl.Popup({ offset: 30 }).setDOMContent(handlePop(feature))
      //   // .setHTML('<h1 onclick=' + { handlePop() } + '> ' + label + ' </h1>');

      //   new mapboxgl.Marker({color: 'red'})
      //     .setLngLat(coordinates)
      //     // .setPopup(popup)
      //     .addTo(map.current);
      // });
      // // })

      map.current.on('mouseenter', 'museum-layer', () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });
      map.current.on('mouseleave', 'museum-layer', () => {
        map.current.getCanvas().style.cursor = '';
      });
    });
  }, [geoData]);

  const [lng1, setLng1] = useState(12.9305676);
  const [lat1, setLat1] = useState(50.8158841);
  const [lng2, setLng2] = useState(12.798598);
  const [lat2, setLat2] = useState(50.812394);
  const [distance, setDistance] = useState('');

  const calculateDistance = () => {
    const from = turf.point([lat1,lng1]);
    console.log("from",from)
    const to = turf.point([lat2,lng2]);
    console.log('to=>',to)
  
    const dist = turf.distance(from, to, { units: 'kilometers' });
    console.log("dist==>",dist + 'km')
    setDistance(dist.toFixed(2));

    // // Add markers and line
    // if (map.current) {
    //   new mapboxgl.Marker({ color: 'red' }).setLngLat([+lng1, +lat1]).addTo(map.current);
    //   new mapboxgl.Marker({ color: 'blue' }).setLngLat([+lng2, +lat2]).addTo(map.current);

    //   const line: turf.Feature<turf.LineString> = turf.lineString([
    //     [+lng1, +lat1],
    //     [+lng2, +lat2],
    //   ]);

    //   if (map.current.getSource('line')) {
    //     (map.current.getSource('line') as mapboxgl.GeoJSONSource).setData(line);
    //   } else {
    //     map.current.addSource('line', {
    //       type: 'geojson',
    //       data: line,
    //     });

    //     map.current.addLayer({
    //       id: 'line',
    //       type: 'line',
    //       source: 'line',
    //       layout: {
    //         'line-cap': 'round',
    //         'line-join': 'round',
    //       },
    //       paint: {
    //         'line-color': '#000',
    //         'line-width': 3,
    //       },
    //     });
    //   }

    //   map.current.fitBounds([
    //     [+lng1, +lat1],
    //     [+lng2, +lat2],
    //   ], { padding: 40 });
    // }
  };
 
  return ( <>
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height: 'calc(100vh - 40px)',
        transition: 'width 300ms ease-in-out',
        overflow: 'hidden',
      }}
    />
    <button onClick={calculateDistance} className='mb-10 cursor-pointer w-[40px] h-[40px]'>Find Distance</button>
    </>
  );
}

export default React.memo(Map);
