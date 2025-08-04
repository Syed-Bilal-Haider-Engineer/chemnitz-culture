import { useMutation, useQuery } from '@tanstack/react-query'
import { MouseEvent, useEffect, useState } from 'react'
import {
  addFavorite,
  findFavorite,
  removeFavorite,
} from '../../_lib/services/favoriteService'
import { HeartMinus, HeartPlus } from 'lucide-react'
import { FavoriteFunctionalityProps } from '@/app/type/type'
import { useContextAPI } from '@/app/_lib/context/contextAPI'
import { FavoriteFormValidate } from '../../_lib/validation/validation'

const FavoriteFunctionality = ({
  id,
  onFavoriteChange,
}: FavoriteFunctionalityProps) => {
  const [token, setToken] = useState<string>('')
  const [validationError, setValidationError] = useState<string>('')
  
  const { data, refetch } = useQuery({
    queryKey: ['favorite', token, id],
    queryFn: findFavorite,
    enabled: !!token,
    staleTime: 1000,
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setToken(token)
      refetch()
    }
  }, [token, refetch])
  
  const addFavoriteMutation = useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      refetch()
      onFavoriteChange?.()
      setValidationError('')
    },
    onError: (error: any) => {
      setValidationError(error.message || 'Failed to add favorite')
    }
  })

  const removeFavoriteMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      refetch()
      onFavoriteChange?.()
      setValidationError('')
    },
    onError: (error: any) => {
      setValidationError(error.message || 'Failed to remove favorite')
    }
  })

  const handleFavorite = (e: React.MouseEvent) => {
    try {
      // Validate the favorite data
      const favoriteData = { featureId: id }
      FavoriteFormValidate.parse(favoriteData)
      setValidationError('')
      
      addFavoriteMutation.mutate({ featureId: id, token })
    } catch (error: any) {
      setValidationError(error.errors?.[0]?.message || 'Invalid favorite data')
    }
  }

  const handleUnFavorite = (e: MouseEvent) => {
    try {
      // Validate the favorite data
      const favoriteData = { featureId: id }
      FavoriteFormValidate.parse(favoriteData)
      setValidationError('')
      
      removeFavoriteMutation.mutate({ featureId: id, token })
    } catch (error: any) {
      setValidationError(error.errors?.[0]?.message || 'Invalid favorite data')
    }
  }
  
  return (
    <>
      {token && (
        <div className="flex flex-col items-center">
          <button
            className='flex gap-1 justify-center items-center ml-2 cursor-pointer'
            aria-label={
              data?.featureId ? 'Remove from favorites' : 'Add to favorites'
            }
          >
            <div className='hover: cursor-pointer'>
              {data?.featureId ? (
                <HeartMinus
                  size={18}
                  color='red'
                  fill='red'
                  onClick={handleUnFavorite}
                />
              ) : (
                <HeartPlus size={18} color='gray' onClick={handleFavorite} />
              )}
            </div>
            <span>{data?.count || 0}</span>
          </button>
          
          {validationError && (
            <div className="mt-1 text-xs text-red-600 max-w-[200px] text-center">
              {validationError}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default FavoriteFunctionality
