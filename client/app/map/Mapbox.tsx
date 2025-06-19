// components/Map.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import SearchBar from '../components/SearchBar'
import { ListFilterPlus, Shapes } from 'lucide-react'; 
import './Mapbox.css';
interface MapProps {
  geoData: any | null;
}

 function Map({ geoData }: MapProps) {
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYmlsYWxzaGFoIiwiYSI6ImNsYjI0dHpocjAweDIzbnFlYTRvbWQydXgifQ.3Bj60LFS6nt7WYVfh3ZeNw";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [10.9214, 50.8323],
      zoom: 15
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
      map.current.fitBounds(bounds, { padding: 50 });
      map.current.on('click', 'museum-layer', (e: any) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const name = e.features[0].properties.name || 'Unnamed Museum';
      const description = e.features[0].properties.description || 'CRM Students';
      const price = '£194';
      const image = "https://media.gettyimages.com/id/682323194/de/foto/front-facade-of-the-karl-marx-monument-chemnitz.jpg?s=1024x1024&w=gi&k=20&c=CJTTLxWo48aQiXUiax3CmN-jumEIVDZMBYo4Z8yP95A="
    const htmlContent = `
      <div style="width: 300px; cursor:pointer; font-family: sans-serif; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
        <div style="display: flex;">
          <div style="padding: 12px; flex: 1;">
            <h2 style="margin: 0; font-size: 16px; font-weight: bold; color: #111;">${name}</h2>
            <p style="margin: 4px 0; color: #888; font-size: 13px;">${description}</p>
            <p style="margin: 6px 0 0; font-size: 14px; color: #333;">
              Rooms from <span style="font-weight: bold; font-size: 16px; color: #000;">${price}</span> <span style="font-size: 12px;">per week</span>
            </p>
          </div>
          <img src="${image}" alt="img" style="width: 100px; height: 100px; object-fit: cover;" />
        </div>
        <div style="display: flex; justify-content: space-around; padding: 8px 12px; font-size: 13px; color: #444; border-top: 1px solid #eee;">
          <div style="display: flex; align-items: center;">🚶 4h 1m</div>
          <div style="display: flex; align-items: center;">🚴 1h 6m</div>
          <div style="display: flex; align-items: center;">🚆 47 mins</div>
        </div>
      </div>
    `;
    new mapboxgl.Popup({ className: "apple-popup" })

   new mapboxgl.Popup({ className: "banana-popup and-another-css-class" })
      new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(coordinates)
        .setHTML(htmlContent)
        .addTo(map.current);
    });

      map.current.on('mouseenter', 'museum-layer', () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });
      map.current.on('mouseleave', 'museum-layer', () => {
        map.current.getCanvas().style.cursor = '';
      });
    });

     for (const marker of geoData.features) {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = `url(https://static.vecteezy.com/system/resources/previews/049/796/035/large_2x/girl-icon-symbol-illustration-isolated-on-white-background-vector.jpg)`;
      el.style.width = `20px`;
      el.style.height = `20px`;
      el.style.backgroundSize = '100%';
      el.style.display = 'block';
      el.style.border = 'none';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';

      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map.current);
    }
  }, [geoData]);

  return (

    <div 
      ref={mapContainer}
      style={{
        width: "100%",
        height: 'calc(100vh - 40px)',
        transition: 'width 300ms ease-in-out',
        overflow: 'hidden',
      }}
    />
     
  );
}

export default React.memo(Map)