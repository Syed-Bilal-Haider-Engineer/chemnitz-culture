import React, { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';

interface CardProps {
  title: string;
  provider: string;
  price: string;
  imageUrl: string;
  isFavorite?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  provider,
  price,
  imageUrl,
  isFavorite = false
}) => {
  const [favorite, setFavorite] = useState(isFavorite);
   const myLoader = () => {
    return `${imageUrl}`;
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6
     transition-transform hover:scale-[1.02] hover:cursor-pointer">
      {/* Image with Heart Icon */}
      <div className="relative h-48 w-full">
        <Image
          loader={myLoader}
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="hover:opacity-90 transition-opacity"
        />
        <button 
          onClick={() => setFavorite(!favorite)}
          className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-full"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? (
            <Heart className="text-red-500 text-xl" />
          ) : (
            <Heart className="text-gray-600 text-xl hover:text-red-500" />
          )}
        </button>
      </div>

      {/* Card Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-lg font-bold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-500">{provider}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">From</p>
            <p className="text-lg font-bold text-gray-800">{price}</p>
            <p className="text-xs text-gray-500">per week</p>
          </div>
        </div>

        {/* Additional Details */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-blue-100 text-green-800 px-2 py-1 rounded">4.8 ★</span>
            <span className="text-xs text-green-500">(124 reviews)</span>
          </div>
          <button className="text-xs font-medium text-green-600 hover:underline">
            View details
          </button>
        </div>
      </div>
    </div>
  );
};

const CardList = () => {
  const card = [
    {
      title: "Chester House",
      provider: "Guy Chester Centre",
      price: "£212.73",
      imageUrl: "https://www.mystudenthalls.com/app/uploads/2021/04/standard-room-2000x1333.jpg",
      isFavorite: false
    },
    {
      title: "Quebec House, Kingston",
      provider: "Fresh",
      price: "£305.00",
      imageUrl: "https://www.mystudenthalls.com/app/uploads/2021/04/standard-room-2000x1333.jpg",
      isFavorite: true
    },
    {
      title: "The Hub",
      provider: "Host",
      price: "£285.00",
      imageUrl: "https://www.mystudenthalls.com/app/uploads/2021/04/standard-room-2000x1333.jpg",
      isFavorite: false
    },
    {
      title: "Great Court",
      provider: "Fresh",
      price: "£320.00",
      imageUrl: "https://www.mystudenthalls.com/app/uploads/2021/04/standard-room-2000x1333.jpg",
      isFavorite: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Cheaper accommodation in London</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 hover:cursor-pointer">
        {card?.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default CardList;