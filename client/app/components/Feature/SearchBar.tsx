'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, X } from 'lucide-react'
import type { Feature } from 'geojson'
import { SearchBarProps } from '@/app/type/type'
import { SearchFormValidate } from '../../_lib/validation/validation'

export default function SearchBar({
  geoData,
  searchHanlde,
  handleRefresh,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Feature[]>([])
  const [validationError, setValidationError] = useState<string>('')

  // 🔹 Load initial 10 items
  const geoJsonData = () => {
    if (geoData?.features?.length > 0) {
      setSearchResults(() => geoData.features.slice(0, 20))
    }
  }
  useEffect(() => {
    geoJsonData()
  }, [geoData])

  // 🔍 Search filter
  const runSearch = (query: string) => {
    const lowerQuery = query.toLowerCase()

    const results = geoData.features.filter(
      (feature: any) =>
        feature?.properties?.name?.toLowerCase().includes(lowerQuery) ||
        feature?.properties?.alt_name?.toLowerCase().includes(lowerQuery) ||
        feature?.category?.toLowerCase().includes(lowerQuery)
    )
    setSearchResults(results)
  }

  // ⌨️ Handle input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    setValidationError('')

    if (query === '' && handleRefresh) {
      handleRefresh()
    } else {
      runSearch(query)
    }
  }

  const handleSelect = (label: string) => {
    try {
      // Validate search keyword
      const searchData = { searchKeyword: label }
      SearchFormValidate.parse(searchData)
      setValidationError('')
      
      setSearchQuery(() => label)
      if (searchHanlde && label) {
        searchHanlde(`${label}`)
      }
    } catch (error: any) {
      setValidationError(error.errors?.[0]?.message || 'Invalid search keyword')
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      handleSelect(e.currentTarget.value)
    }
  }
  
  const renderList = (feature: any) => {
    const label =
      feature?.properties?.name ||
      feature?.properties?.alt_name ||
      feature?.category
    return (
      <div
        key={feature.id}
        className='flex items-center gap-2 px-3 py-3 border-b-1 border-green-200 hover:bg-gray-50 cursor-pointer'
        onClick={() => handleSelect(label)}
      >
        <MapPin className='text-green-500 w-4 h-4' />
        <div className='text-gray-800 text-sm'>{label}</div>
      </div>
    )
  }

  const clearHandleQuery = () => {
    setSearchQuery('')
    setValidationError('')
    handleRefresh?.()
  }
  
  return (
    <div
      className='relative w-[250px] max-w-full bg-white overflow-y-auto'
      style={{ height: '100vh' }}
    >
      <div className='relative mt-3 mx-2'>
        <input
          type='text'
          placeholder='Search Location'
          value={searchQuery}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          className='w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-sm shadow focus:outline-none focus:ring-2 focus:ring-green-400 bg-white'
        />
        <Search size={18} className='absolute left-3 top-2.5 text-green-500' />
        {searchQuery && (
          <X
            size={18}
            className=' absolute right-3 top-2.5 text-green-500 hover:cursor-pointer'
            onClick={clearHandleQuery}
          />
        )}
      </div>

      {validationError && (
        <div className="mx-2 mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-xs">
          {validationError}
        </div>
      )}

      {searchResults.length > 0 && (
        <div className=' rounded-lg '>
          {searchResults.map((feature: any) => {
            return renderList(feature)
          })}
        </div>
      )}
    </div>
  )
}
