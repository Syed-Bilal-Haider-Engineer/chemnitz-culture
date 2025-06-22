'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, HeartOff } from 'lucide-react';

interface PopupCardProps {
  id: string;
  name?: string;
  initialFavorite?: boolean;
  favoriteCount?: number;
}

// Mock API functions
const mockFavoriteAPI = {
  toggleFavorite: async (id: string, isFavorite: boolean) => {
    console.log(`Mock API: ${isFavorite ? 'Removing' : 'Adding'} favorite for ID: ${id}`);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  },
  getCount: async (id: string) => {
    // Return random count for demo
    return Math.floor(Math.random() * 100);
  }
};

const PopupCard = ({ 
  id, 
  name, 
  initialFavorite = false,
  favoriteCount: initialCount = 0
}: PopupCardProps) => {
  const encodedId = encodeURIComponent(id);
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [favoriteCount, setFavoriteCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);
  console.log("name==>",name)
  useEffect(() => {
    // Fetch initial favorite count (in a real app, you'd do this once when loading all cards)
    mockFavoriteAPI.getCount(id)
      .then(count => setFavoriteCount(count))
      .catch(console.error);
  }, [id]);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();
    
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const newFavoriteState = !isFavorite;
      const response = await mockFavoriteAPI.toggleFavorite(id, isFavorite);
      
      if (response.success) {
        setIsFavorite(newFavoriteState);
        setFavoriteCount(prev => newFavoriteState ? prev + 1 : prev - 1);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      width: 180,
      fontFamily: 'sans-serif',
      overflow: 'hidden',
      position: 'relative',
      backgroundColor:"transparent"
    }}>
      <Link 
        href={{
          pathname:"/details",
          query: {
            id: encodedId
          }
        }}
        style={{ textDecoration: 'none',border:'none', outline:'none' }}
      >
        <div style={{ display: 'flex', cursor: 'pointer' }}>
          <div style={{ padding: 12, flex: 1 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 'bold', color: '#111' }}>{name}</h2>
          </div>
        </div>
      </Link>
        <button
         className='flex gap-1 ml-2'
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <div>{isFavorite ? (
            <HeartOff size={18} color="red" fill="red" />
          ) : (
            <Heart size={18} color="gray" />
          )}</div>
          <span> {favoriteCount}</span>
        </button>
    </div>
  );
};

export default PopupCard;