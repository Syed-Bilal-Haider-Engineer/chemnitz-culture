// // Hooks/useMapData.ts
'use client';
// import { FeatureCollection } from 'geojson';
import { useState, useCallback } from 'react';

import axios from "axios";
import { FeatureCollection } from "geojson";

export function useMapData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (endpoint: string, filters?: any) => {
    setLoading(true);
    try {
      const query = filters ? `?${new URLSearchParams(filters).toString()}` : '';
      const res = await fetch(`http://localhost:4000/api/${endpoint}${query}`);
      console.log("res==>",res)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      console.log('Raw API response:', data);

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
const API_BASE = 'http://localhost:4000/api'; 
export const getAllPlaces = async (): Promise<FeatureCollection> => {
  const { data } = await axios.get(`${API_BASE}/features`);

  const features = data.features || data.results || [];

  if (!Array.isArray(features)) {
    throw new Error("Invalid features array in API response.");
  }

  const geoData: FeatureCollection = {
    type: 'FeatureCollection',
    features
  };

  return geoData;
};


export const searchPlacesByKeyword  = async (query:any): Promise<FeatureCollection> => {

  const { data } = await axios.get(`${API_BASE}/search?searchKeyword=${query}`);

  const features = data.features || data.results || [];

  if (!Array.isArray(features)) {
    throw new Error("Invalid features array in API response.");
  }

  const geoData: FeatureCollection = {
    type: 'FeatureCollection',
    features
  };

  return geoData;
};

export const searchPlacesByCategory  = async (query:any): Promise<FeatureCollection> => {

  const { data } = await axios.get(`${API_BASE}/filter?category=${query}`);

  const features = data.features || data.results || [];

  if (!Array.isArray(features)) {
    throw new Error("Invalid features array in API response.");
  }

  const geoData: FeatureCollection = {
    type: 'FeatureCollection',
    features
  };

  return geoData;
};