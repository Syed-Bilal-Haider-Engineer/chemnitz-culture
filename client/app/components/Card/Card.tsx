import React from 'react';
import { Star, Eye } from 'lucide-react';

interface TextCardProps {
  title: string;
  description: string;
  rating: number;
  reviews: number;
  onView?: () => void;
}

const TextCard: React.FC<TextCardProps> = ({
  title,
  description,
  rating,
  reviews,
  onView
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
        <button
          className="flex items-center gap-1 text-green-600 text-sm hover:underline"
          onClick={onView}
        >
          <Eye className="w-4 h-4" />
          View
        </button>
      </div>
    </div>
  );
};

const TextCardList = () => {
  const data = [
    {
      title: 'Chemnitz Opera House',
      description:
        'A prominent landmark known for classic and modern performances, contributing to the city’s rich cultural scene.',
      rating: 4.7,
      reviews: 98
    },
    {
      title: 'Kunstsammlungen Museum',
      description:
        'This museum showcases a fine collection of modern art and historic exhibitions.',
      rating: 4.5,
      reviews: 54
    },
    {
      title: 'Villa Esche',
      description:
        'An architectural gem built by Henry van de Velde, now a cultural and conference center.',
      rating: 4.8,
      reviews: 72
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {data.map((item, index) => (
        <TextCard
          key={index}
          title={item.title}
          description={item.description}
          rating={item.rating}
          reviews={item.reviews}
          onView={() => alert(`Viewing ${item.title}`)}
        />
      ))}
    </div>
  );
};

export default TextCardList;
