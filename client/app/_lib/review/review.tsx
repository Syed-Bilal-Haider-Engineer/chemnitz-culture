'use client';

import ReactStars from 'react-stars'
import { useEffect, useState } from 'react';

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
 user:{
    email:string;
    name: string;
 }
}

interface ReviewSectionProps {
  reviews: Review[];
  averageRating: number;
  userId?: string;
  featureId: string;
  token:string;
  onReviewSubmit: (rating: number, comment: string) => Promise<void>;
}

export function ReviewSection({
  reviews,
  averageRating,
  featureId,
  onReviewSubmit,
  token
}: ReviewSectionProps) {
  const [rating, setRating] = useState<number>(1);
  const [reviewText, setReviewText] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
 const [domLoaded,setDomLoaded] = useState(false);
    useEffect(() => {
       setDomLoaded(true);
    },[])
  console.log("|reviews", reviews)
   const handleSubmit = async () => {
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

    const handleUpdate = async () => {
    if (rating === 0) return;
    
    setIsSubmitting(true);
    try {
      await onReviewSubmit(rating, reviewText);
      setRating(0);
      setReviewText('');
      setShowReviewForm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

    const handleRemove = async () => {
    if (rating === 0) return;
    
    setIsSubmitting(true);
    try {
      await onReviewSubmit(rating, reviewText);
      setRating(0);
      setReviewText('');
      setShowReviewForm(false);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const ratingChanged = (newRating:number) => {
  console.log(newRating)
  setRating(newRating)
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
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Share Your Experience</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
            <div className="flex space-x-1">
             { domLoaded && <ReactStars
                count={5}
                value={rating}
                onChange={ratingChanged}
                size={24}
                color2={'#ffd700'} />}

            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
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
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0}
            className="px-4 py-2 bg-green-600 cursor-pointer text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-8">
        {reviews.length > 0 ? (
          reviews.map((review:any) => (
            <div key={review.id} className="border-b border-gray-200 pb-8 last:border-0">
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
          ))
        ) : (
          <div className="text-left py-8">
            <p className="text-gray-500 text-lg">No reviews yet. Be the first to review!</p>
          </div>
        )}
      </div>
    </div>
  );
}