'use client'
import React from 'react'
import CardList from '../common/Card'
import { useQuery } from '@tanstack/react-query';
import { useContextAPI } from '../context/contextAPI';
import { findAllFavorites } from '../services/favoriteService';

function Favorites() {

  const {token} = useContextAPI();
  const { data, refetch } = useQuery({
    queryKey: ['FindAllfavorite', token],
    queryFn: findAllFavorites,
    enabled: !!token,
  });
  console.log(data,"data");
  
  return (
 <CardList data={data} token={token}/>
  )
}

export default Favorites