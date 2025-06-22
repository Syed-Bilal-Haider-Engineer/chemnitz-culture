// components/Map.tsx
'use client';
import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import SearchBar from '../components/SearchBar';
import {ListFilterPlus, Shapes} from 'lucide-react';
import ReactDOM from 'react-dom/client';
import './Mapbox.css';
import PopupCard from './PopCard';
interface MapProps {
  geoData: any | null;
}

function Map({geoData}: MapProps) {
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);

  const handlePop = (feature: any): HTMLElement => {
  const container = document.createElement('div');
  const root = ReactDOM.createRoot(container);
     const label =
          feature.properties.name ||
          feature.properties.description ||
          feature.properties.artwork_type;
  root.render(
    <PopupCard
      id={feature.properties['@id']}
      name={label}
    />
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
          'circle-radius': 6,
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
    
      geoData.features.forEach((feature: any) => {
        const coordinates = feature.geometry.coordinates;
        // console.log('feature.properties==>', feature.properties);
       const popup = new mapboxgl.Popup({ offset: 30 }).setDOMContent(handlePop(feature))
        // .setHTML('<h1 onclick=' + { handlePop() } + '> ' + label + ' </h1>');

        new mapboxgl.Marker({color: 'red'})
          .setLngLat(coordinates)
          .setPopup(popup)
          .addTo(map.current);
      });

      map.current.on('mouseenter', 'museum-layer', () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });
      map.current.on('mouseleave', 'museum-layer', () => {
        map.current.getCanvas().style.cursor = '';
      });
    });
  }, [geoData]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height: 'calc(100vh - 40px)',
        transition: 'width 300ms ease-in-out',
        overflow: 'hidden',
      }}
    />
  );
}

export default React.memo(Map);
