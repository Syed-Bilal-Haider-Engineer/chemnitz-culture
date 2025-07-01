import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

export const addFavorite = async ({featureId, token} :{featureId:string, token:string}) => {

     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/addFavorite`, {
    method: "POST",
    headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
    body: JSON.stringify({
     featureId
    }),
  });
 
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Interval server error");
  }

  return res.json();
};

export const removeFavorite = async ({featureId, token} :{featureId:string, token:string}) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE}/removeFavorite`,
    { featureId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const findAllFavorites = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>) => {
    const [, token] = queryKey;
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/findAllFavorites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const findFavorite = async ({
  queryKey,
}: QueryFunctionContext<[string, string, string]>) => {
  const [, token, id] = queryKey;
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/favorite?featureId=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

