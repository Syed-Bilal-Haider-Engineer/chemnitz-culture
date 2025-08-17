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

const FavoriteFunctionality = ({
  id,
  onFavoriteChange,
}: FavoriteFunctionalityProps) => {
  const [token, setToken] = useState<string>('')
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
    addFavoriteMutation.mutate({ featureId: id, token })
  }

  const handleUnFavorite = (e: MouseEvent) => {
    removeFavoriteMutation.mutate({ featureId: id, token })
  }
  return (
    <>
      {token && (
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
      )}
    </>
  )
}

export default FavoriteFunctionality
