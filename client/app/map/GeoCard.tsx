'use client';
import React from 'react';
import Link from 'next/link';
import FavoriteFunctionality from '../common/FavoriteFunctionality';

interface PopupCardProps {
  id: string;
  name?: string;
  token: string;
}

const GeoCard = ({ id, name, token }: PopupCardProps) => {
  const encodedId = encodeURIComponent(id);

  return (
    <div style={{
      width: 180,
      fontFamily: 'sans-serif',
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: 'transparent'
    }}>
      <Link
        href={{ pathname: '/placeViewDetails', query: { id: encodedId } }}
        style={{ textDecoration: 'none', border: 'none', outline: 'none' }}
      >
        <div style={{ display: 'flex', cursor: 'pointer' }}>
          <div style={{ padding: 12, flex: 1 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 'bold', color: '#111' }}>{name}</h2>
          </div>
        </div>
      </Link>
     {id && token && <FavoriteFunctionality id={id} token={token}/>}
    </div>
  );
};

export default GeoCard;
