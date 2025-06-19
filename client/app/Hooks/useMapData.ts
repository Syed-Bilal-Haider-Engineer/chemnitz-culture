// Hooks/useMapData.ts
'use client';
import { FeatureCollection } from 'geojson';
import { useState, useCallback } from 'react';

export function useMapData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (endpoint: string, filters?: any) => {
    setLoading(true);
    try {
      const query = filters ? `?${new URLSearchParams(filters).toString()}` : '';
      const res = await fetch(`http://localhost:4000/api/${endpoint}${query}`);
      
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      console.log('Raw API response:', data);

      // Handle both response formats:
      // 1. Standard GeoJSON with 'features'
      // 2. Your custom format with 'results'
      const features = data.features || data.results || [];
      
      if (!Array.isArray(features)) {
        throw new Error('Invalid features array');
      }

      const geoData: FeatureCollection = {
        type: 'FeatureCollection',
        features: features
      };

      return geoData;
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, fetchData,setLoading };
}