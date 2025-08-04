'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState, useMemo } from 'react'
import type { FeatureCollection } from 'geojson'
import { useContextAPI } from '../_lib/context/contextAPI'
import {
  getAllPlaces,
  searchPlacesByCategory,
  searchPlacesByKeyword,
} from '../_lib/services/mapService'
import { useQuery } from '@tanstack/react-query'
import Loader from '../components/specialized/Loader'
import ErrorMessage from '../components/specialized/ErrorMessage'
import { RotateCcw } from 'lucide-react'
import { authentication } from '../_lib/services/authenticationService'

const Map = dynamic(() => import('./Mapbox'), { ssr: false })
const SearchBar = dynamic(() => import('../components/Feature/SearchBar'), {
  ssr: false,
})
const CategorySelect = dynamic(() => import('../components/Feature/Filter'), {
  ssr: false,
})

export default function MapPage() {
  const { isLogin, isSignUp, isProfile, token, setTokenState } = useContextAPI()

  const [geoData, setGeoData] = useState<FeatureCollection | null>(null)
  const [geoSource, setGeoSource] = useState<'default' | 'search' | 'category'>(
    'default'
  )
  const [activeCategory, setActiveCategory] = useState<number>(0)
  

  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery<
    FeatureCollection,
    Error
  >({
    queryKey: ['allPlaces'],
    queryFn: getAllPlaces,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const storedToken = token || localStorage.getItem('token');
        if (!storedToken) {
          localStorage.removeItem('token');
          setTokenState('');
          return;
        }

        const authResult = await authentication(storedToken);
        if (!authResult.success) {
          console.log('Authentication failed:', authResult.message);
          setTokenState('');
          localStorage.removeItem('token');
        } 
      } catch (error) {
        console.error('Auth verification error:', error);
        setTokenState('');
        localStorage.removeItem('token');
      }
    };

    verifyAuth();
  }, [token, setTokenState]); 

  useEffect(() => {
    if (geoSource === 'default' && data) {
      setGeoData(data)
    }
  }, [data, geoSource])

  const sidebarClass = useMemo(() => {
    return `w-[250px] bg-white border-r border-green-200 shadow-md rounded-r-2xl ${
      !isLogin || !isSignUp || !isProfile ? 'z-10' : ''
    }`
  }, [isLogin, isSignUp, isProfile])

  const handleSearch = useCallback(async (query: string) => {
    try {
      const result = await searchPlacesByKeyword(query)
      setGeoData(result)
      setGeoSource('search')
    } catch (err) {
      console.error('Search failed:', err)
    }
  }, [])

  const handleCategories = useCallback(async (category: string) => {
    try {
      const result = await searchPlacesByCategory(category)
      setGeoData(result)
      setGeoSource('category')
      setActiveCategory((prev) => prev + 1)
    } catch (err) {
      console.error('Category filter failed:', err)
    }
  }, [])

  const handleRefresh = async () => {
    setGeoSource('default')
    setActiveCategory((prev) => prev + 1)
    await refetch()
  }

  if (isLoading) return <Loader />

  if (isError) {
    return (
      <ErrorMessage
        message={error?.message || 'Failed to load places.'}
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <div className='flex w-full h-screen'>
      <div className={sidebarClass}>
        {geoData && (
          <SearchBar
            geoData={geoData}
            searchHanlde={handleSearch}
            handleRefresh={handleRefresh}
          />
        )}
      </div>

      <div className='flex-1 relative p-1'>
        <div
          className='w-full rounded-2xl shadow-lg overflow-hidden'
          style={{ boxShadow: '0 4px 12px rgba(0, 128, 0, 0.1)' }}
        >
          {geoData && (
            <Map
              geoData={geoData}
              key={`${geoSource}-${geoData?.features?.length || 0}`}
              activeCategory={activeCategory}
            />
          )}

          <div className='absolute top-4 right-4 flex gap-2 z-10'>
            <CategorySelect onSelect={handleCategories} />
            <button
              onClick={handleRefresh}
              disabled={isRefetching}
              className='flex items-center cursor-pointer gap-1 bg-white px-3 py-1.5 rounded-lg shadow hover:bg-gray-100 transition'
            >
              <RotateCcw
                className={
                  isRefetching
                    ? 'animate-spin w-4 h-4 text-green-600'
                    : 'w-4 h-4 text-green-600'
                }
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
