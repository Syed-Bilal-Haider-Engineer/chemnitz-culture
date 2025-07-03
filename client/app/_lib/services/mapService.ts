'use client';
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/${endpoint}${query}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
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
      
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, fetchData,setLoading };
}

export const getAllPlaces = async (): Promise<FeatureCollection> => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/places`);

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

  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/search?searchKeyword=${query}`);

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

  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/filter?category=${query}`);

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