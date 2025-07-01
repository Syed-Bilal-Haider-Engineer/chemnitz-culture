'use client'
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

export const getPlaceViewDetails = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>) => {
  const [, id] = queryKey;

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/featuresDetails?featureId=${id}`);

  return response.data;
};
