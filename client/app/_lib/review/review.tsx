'use client';

import ReactStars from 'react-stars'
import { useEffect, useRef, useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { getReview } from '../services/reviewService';
import { useContextAPI } from '../context/contextAPI';
import { getUserProfile } from '../services/userService';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/app/components/specialized/Loader';
import ErrorMessage from '@/app/components/specialized/ErrorMessage';
import { ReviewSectionProps } from '@/app/type/type';
export default function ReviewSection({
  reviews,
  averageRating,
  featureId,
  onReviewRemove,
  onReviewSubmit,
  onReviewUpdate,
  token,
}: ReviewSectionProps) {
  const {setIsLogin} = useContextAPI()
  const [rating, setRating] = useState<number>(1);
  const [reviewText, setReviewText] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [domLoaded,setDomLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

 const { data, isLoading, isError, error ,refetch} = useQuery({
     queryKey: ["user", token],
     queryFn: getUserProfile,
     enabled: !!token, 
   });

  useEffect(() => {
       setDomLoaded(true);
    },[])

  const handleSubmit = async () => {
    if(!token){
    return setIsLogin(true)
    }
    if (rating < 1 || rating > 5) return; 
    
    setIsSubmitting(true);
    try {
      await onReviewSubmit(Math.round(rating), reviewText);
      setRating(0);
      setReviewText('');
      setShowReviewForm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove =  (reviewId:string) => {
    onReviewRemove(reviewId);
    setOpen(false);
  };

  const handleUpdate = async () => {
    if (!editingReviewId) return;
      await onReviewUpdate(rating, editingReviewId, reviewText);
      setEditingReviewId(null);
      setReviewText('');
      setRating(1);
      setShowReviewForm(false);
   
  };
  
  const ratingChanged = (newRating:number) => {
  setRating(newRating)
}
 
  // Fetch review data for editing
  const fetchUpdateReview = async (reviewId: string) => {
    try {
      const res = await getReview({ reviewId, token });
      setRating(res?.reviews.rating);
      setReviewText(res?.reviews.comment);
      setEditingReviewId(reviewId);   
      setShowReviewForm(true);       
      setOpen(false);
    } catch (error) {
      console.error('Failed to fetch review for update', error);
    }
  };
// Close dropdown if clicked outside
  useEffect(() => {
    const handler = (e:MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
 
  if (isLoading) return <Loader />
  
    if (isError) {
      return (
        <ErrorMessage
          message={error?.message || 'Failed to load User.'}
          onRetry={() => refetch()}
        />
      )
    }
  

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Customer Reviews</h2>
        {token && (
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            {showReviewForm ? 'Cancel' : 'Write a Review'}
          </button>
        )}
      </div>

      {/* Rating Summary */}
      <div className="flex items-center mb-8 py-2 border-b-1 border-gray-300">
        <div className="flex mr-2">
        {domLoaded && <ReactStars
            edit={false}
            count={5}
            size={24}
            value={averageRating}
            color2={'#ffd700'} />}
        </div>
        <span className="text-lg text-gray-600">
          {averageRating.toFixed(1)} out of 5 ({reviews.length} reviews)
        </span>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {editingReviewId ? 'Update Your Review' : 'Share Your Experience'}
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
            <div className="flex space-x-1">
              {domLoaded && (
                <ReactStars
                  count={5}
                  value={rating}
                  onChange={ratingChanged}
                  size={24}
                  color2={'#ffd700'}
                />
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Review
            </label>
            <textarea
              id="review"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
               focus:ring-green-600 focus:border-green-500"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share details about your experience..."
              required
            />
          </div>
          {editingReviewId ? (
            <button
              type="button"
              onClick={handleUpdate}
              disabled={isSubmitting || rating === 0}
              className="px-4 py-2 bg-green-600 cursor-pointer text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-colors"
            >
              {isSubmitting ? 'Updating...' : 'Update Review'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || rating === 0}
              className="px-4 py-2 bg-green-600 cursor-pointer text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          )}
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-8">
        {reviews.length > 0 ? (
          reviews.map((review:any) => {
            return ( 
            <div className="flex justify-between items-center" key={review.id}>
            <div  className="border-b border-gray-200 pb-8 last:border-0">
              <div className="flex items-center mb-3">
                <div className="flex mr-2">
                { domLoaded && <ReactStars
                count={5}
                value={review?.rating}
                onChange={ratingChanged}
                size={24}
                color2={'#ffd700'} />}
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <p className="text-gray-800 mb-2">{review?.comment}</p>
            </div>
            {data?.user.id == review?.userId ? <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
             {open && (
              <div className="absolute right-0 mt-2 w-20  cursor-pointer bg-white rounded-md shadow-lg py-1 z-50">
                    <button
                     onClick={() => fetchUpdateReview(review?.id)}
                      className=" px-4 cursor-pointer py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    >
                      Update 
                    </button>
                    <button 
                     onClick={() => handleRemove(review?.id)} 
                      className=" px-4 py-2  cursor-pointer  text-sm text-gray-700 hover:bg-gray-100 w-full"
                    >
                    Delete 
                    </button>
              </div>
            )}
          </div>:''}
      </div>
  )
})
  ) : (
          <div className="text-left py-8">
            <p className="text-gray-500 text-lg">No reviews yet. Be the first to review!</p>
          </div>
        )}
      </div>
    </div>
  );
}