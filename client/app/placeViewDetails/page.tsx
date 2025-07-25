'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import {
  Phone,
  Wifi,
  Bike,
  Car,
  Video,
  User,
  Lock,
  Utensils,
  Drumstick,
  Bed,
  Key,
  Dumbbell,
  Table2,
  Tv,
  Wrench,
  ClipboardList,
  Book,
  Film,
  CircleDollarSign,
  HeartPulse,
  Beer,
  Trees,
  Sofa,
  Calendar,
  UserCog,
  ArrowUpDown,
  Users,
  ArrowLeft,
} from 'lucide-react'
import { getPlaceViewDetails } from '../_lib/services/viewService'
import { useContextAPI } from '../_lib/context/contextAPI'
import FavoriteFunctionality from '../components/common/FavoriteFunctionality'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ErrorMessage from '../components/specialized/ErrorMessage'
import Loader from '../components/specialized/Loader'
import { addReview, removeReview, updateReview } from '../_lib/services/reviewService'
import dynamic from 'next/dynamic'

const ReviewSection = dynamic(
  () => import('../_lib/review/review').then(mod => mod.default),  
  {
    ssr: false
  }
);

export default function PlaceViewDetails() {
  const router = useRouter()
  const { token } = useContextAPI()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const decodedId = id ? decodeURIComponent(id) : null
  const { data, refetch, isError, isLoading, error } = useQuery({
    queryKey: ['getPlaceDetails', decodedId!],
    queryFn: getPlaceViewDetails,
    enabled: !decodedId,
  })

  useEffect(() => {
    if (id) {
      refetch()
    }
  }, [id, token])

  if (isError) {
    return (
      <ErrorMessage
        message={error?.message || 'Failed to load Details Place.'}
        onRetry={refetch}
      />
    )
  }

  if (isLoading) return <Loader />
  const place = data?.feature
  const props = place?.properties || {}
  const reviews = place?.review || []

  const averageRating =
    reviews?.length > 0
      ? reviews.reduce((sum: Number, review: any) => sum + review.rating, 0) /
        reviews.length
      : 0

  const handleReviewSubmit = async (rating: number, comment: string) => {
    if (!decodedId || !token) return

    try {
      const res = await addReview({
        featureId: decodedId,
        rating,
        comment,
        token,
      })

      if (res.success) {
        refetch()
      }
    } catch (error) {
      console.error('Failed to submit review:', error)
      throw error
    }
  }

  const handleDeleteReview = async (reviewId: string) => {
    if (!token) return;
     const res = await removeReview({
        reviewId,
        token
      })

      if (res?.success) {
        refetch()
      }
  }

  const handleUpdateReview = async(rating:number, editingReviewId:string, reviewText:string) => {
    if(!token) return;
    const res = await updateReview({
      rating, comment:reviewText,reviewId:editingReviewId, token
    });
    if(res.review?.id){
      refetch()
    }
  }
  return (
    <div className='font-sans text-gray-800 w-full px-6 sm:px-20'>
        <div className='p-6 flex flex-col sm:flex-row justify-between gap-6'>
          <div className='mt-4'>
            <button
              onClick={() => router.back()}
              className='mb-4 text-sm text-blue-600 cursor-pointer hover:underline flex items-center'
            >
              <ArrowLeft className='w-4 h-4 mr-1' /> Back
            </button>
            <h1 className='text-2xl font-bold text-gray-800'>
              {props.name || 'Cultural Site'}
            </h1>
            <p className='text-gray-600'>{props['addr:city'] || 'Chemnitz'}</p>

            {props.website && (
              <a
                href={props.website}
                target='_blank'
                className='text-blue-600 text-sm hover:underline mt-2 block'
              >
                Website Link
              </a>
            )}

            <div className='mt-4'>
              <p className='text-sm text-gray-700'>
                Category: {place?.category || 'General'}
              </p>
              {props['addr:street'] && (
                <p className='text-sm text-gray-600'>
                  Street: {props['addr:street']}
                </p>
              )}
              {props['addr:housenumber'] && (
                <p className='text-sm text-gray-600'>
                  House no: {props['addr:housenumber']}
                </p>
              )}
              {props['addr:postcode'] && (
                <p className='text-sm text-gray-600'>
                  Postal code: {props['addr:postcode']}
                </p>
              )}
              {props['operator'] && (
                <p className='text-sm text-gray-600'>
                  Operator: {props['operator']}
                </p>
              )}
            </div>

            <h2 className='text-lg font-semibold text-gray-800 mt-6'>
              Eigenschaften
            </h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
              {props.wheelchair && (
                <FeatureItem
                  icon={<Key className='w-4 h-4' />}
                  label='Barrierefrei'
                />
              )}
              {props.toilets && (
                <FeatureItem
                  icon={<Lock className='w-4 h-4' />}
                  label='Toiletten verfügbar'
                />
              )}
              {props.tourism && (
                <FeatureItem
                  icon={<ClipboardList className='w-4 h-4' />}
                  label={props.tourism}
                />
              )}
              {props.amenity && (
                <FeatureItem
                  icon={<Utensils className='w-4 h-4' />}
                  label={props.amenity}
                />
              )}
              {props.artwork_type && (
                <FeatureItem
                  icon={<Film className='w-4 h-4' />}
                  label={props.artwork_type}
                />
              )}
            </div>
          </div>

          <div className='self-start'>
            <div className='mt-6'>
              <div className='flex justify-center items-center'>
                <p className='text-sm text-gray-600'>ID: {props['@id']}</p>
                {decodedId && (
                  <FavoriteFunctionality id={decodedId} />
                )}
              </div>
              {props?.wikidata && (
                <p className='text-sm text-gray-600'>
                  Wikidata: {props?.wikidata}
                </p>
              )}
              {props['website:menu'] && (
                <a
                  href={props['website:menu']}
                  target='_blank'
                  className='text-blue-600 text-sm hover:underline mt-2 block'
                >
                  Menue
                </a>
              )}
            </div>
          </div>
        </div>
        {/* reviews sections */}
        <ReviewSection
          key={JSON.stringify(reviews)}
          reviews={reviews}
          averageRating={averageRating}
          featureId={decodedId || ''}
          onReviewSubmit={handleReviewSubmit}
          token={token}
          onReviewRemove={handleDeleteReview}
          onReviewUpdate={handleUpdateReview}
        />
      </div>
  )
}

function FeatureItem({
  icon,
  label,
}: {
  icon: React.ReactNode
  label: string
}) {
  return (
    <div className='flex items-center text-sm text-gray-700'>
      {icon}
      <span className='ml-2'>{label}</span>
    </div>
  )
}
