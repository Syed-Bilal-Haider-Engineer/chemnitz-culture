import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import {
  addFavorite,
  findFavorite,
  removeFavorite,
} from '../../_lib/services/favoriteService'
import { HeartMinus, HeartPlus } from 'lucide-react'

interface FavoriteFunctionalityProps {
  id: string
  token: string
  onFavoriteChange?: () => void // New callback prop
}

const FavoriteFunctionality = ({
  id,
  token,
  onFavoriteChange,
}: FavoriteFunctionalityProps) => {
  const { data, refetch } = useQuery({
    queryKey: ['favorite', token, id],
    queryFn: findFavorite,
    enabled: !!token,
  })
  console.log('token=>', token, 'id=>', id)
  const addFavoriteMutation = useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      refetch()
      onFavoriteChange?.()
    },
  })

  const removeFavoriteMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      refetch()
      onFavoriteChange?.()
    },
  })

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addFavoriteMutation.mutate({ featureId: id, token })
  }

  const handleUnFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    removeFavoriteMutation.mutate({ featureId: id, token })
  }
  return (
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
  )
}

export default FavoriteFunctionality
