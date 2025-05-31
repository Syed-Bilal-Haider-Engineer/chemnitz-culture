'use client';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";

interface MapProps {
  geoData: any | null;
}

export default function Map({ geoData }: MapProps) {
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYmlsYWxzaGFoIiwiYSI6ImNsYjI0dHpocjAweDIzbnFlYTRvbWQydXgifQ.3Bj60LFS6nt7WYVfh3ZeNw";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [12.9214, 50.8323], // Chemnitz
      zoom: 12,
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
          'circle-color': '#ff5200',
          'circle-stroke-width': 1,
          'circle-stroke-color': 'red',
        },
      });

      // Fit to museum data
      const bounds = new mapboxgl.LngLatBounds();
      geoData.features.forEach((feature: any) => {
        bounds.extend(feature.geometry.coordinates);
      });
      map.current.fitBounds(bounds, { padding: 50 });

      // Popup on click
      map.current.on('click', 'museum-layer', (e: any) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const name = e.features[0].properties.name || 'Unnamed Museum';

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<strong>${name}</strong>`)
          .addTo(map.current);
      });

      // Cursor styling
      map.current.on('mouseenter', 'museum-layer', () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });
      map.current.on('mouseleave', 'museum-layer', () => {
        map.current.getCanvas().style.cursor = '';
      });
    });
  }, [geoData]);

  return (
    <div id="map">
      <div style={{ width: '100%', height: '90vh' }} ref={mapContainer} />
    </div>
  );
}
