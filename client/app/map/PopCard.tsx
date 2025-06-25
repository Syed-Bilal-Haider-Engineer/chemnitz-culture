'use client';
import React from 'react';
import Link from 'next/link';
import {  HeartMinus, HeartPlus } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addFavorite, findFavorite, removeFavorite } from '../services/favoriteService';

interface PopupCardProps {
  id: string;
  name?: string;
  token: string;
}

const PopupCard = ({ id, name, token }: PopupCardProps) => {
  const encodedId = encodeURIComponent(id);

  const { data, refetch } = useQuery({
    queryKey: ['favorite', token, id],
    queryFn: findFavorite,
    enabled: !!token,
  });

  const addFavoriteMutation = useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      refetch(); // Refetch the favorite status
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      refetch(); // Refetch the favorite status
    },
  });

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addFavoriteMutation.mutate({ featureId: id, token });
  };

  const handleUnFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeFavoriteMutation.mutate({ featureId: id, token });
  };
console.log(data,"data")
  return (
    <div style={{
      width: 180,
      fontFamily: 'sans-serif',
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: 'transparent'
    }}>
      <Link
        href={{ pathname: '/details', query: { id: encodedId } }}
        style={{ textDecoration: 'none', border: 'none', outline: 'none' }}
      >
        <div style={{ display: 'flex', cursor: 'pointer' }}>
          <div style={{ padding: 12, flex: 1 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 'bold', color: '#111' }}>{name}</h2>
          </div>
        </div>
      </Link>

      <button
        className="flex gap-1 ml-2 cursor-pointer"
        aria-label={data?.featureId ? 'Remove from favorites' : 'Add to favorites'}
      >
        <div className="hover: cursor-pointer">
          {data?.featureId ? (
            <HeartMinus  size={18} color="red" fill="red" onClick={handleUnFavorite} />
          ) : (
            <HeartPlus   size={18} color="gray" onClick={handleFavorite} />
          )}
        </div>
        <span>{data?.count || 0}</span>
      </button>
    </div>
  );
};

export default PopupCard;
