'use client';
import React from 'react';
import { Star, Eye } from 'lucide-react';
import Link  from 'next/link';
import FavoriteFunctionality from '../common/FavoriteFunctionality';
interface TextCardProps {
  id:string;
  title: string;
  description: string;
  rating?: number;
  reviews?: number;
  onView?: () => void;
  token:string
}

const TextCard: React.FC<TextCardProps> = ({
    id,
  title,
  description,
  rating = 3,
  reviews = 0,
  token
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{description}</p>

      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
        <div className="flex items-center gap-1 text-sm text-yellow-600">
          <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-500" />
          {rating.toFixed(1)}
          <span className="text-gray-500 ml-1">({reviews} reviews)</span>
        </div>
        <Link
        href={{ pathname: '/placeViewDetails', query: { id: encodeURIComponent(id) } }}
        style={{ textDecoration: 'none', border: 'none', outline: 'none' }}
      >
        <button
          className="flex items-center cursor-pointer gap-1 text-green-600 text-sm hover:underline"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
        </Link>
        <FavoriteFunctionality id={id} token={token}/>
      </div>
    </div>
  );
};

 const TextCardList = (props:any) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {(props.data || []).map((item:any, index:any) => (
        <TextCard
          key={item?.featureId + index}
          id={item?.featureId}
          title={
            item.post?.properties?.name ||
            item.post?.properties?.artwork_type ||
            'Untitled'
          }
          description={
            item.post?.properties?.description ||
            item.post?.properties?.amenity ||
            item.post?.properties?.tourism ||
            'An architectural gem in Chemnitz.'
          }
          rating={item.rating ?? 4.2}
          reviews={item.reviews ?? 50}
          token={props.token}
        />
      ))}
    </div>
  );
};

export default TextCardList;