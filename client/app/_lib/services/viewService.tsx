import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const API_BASE = 'http://localhost:4000/api'; 
export const getPlaceViewDetails = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>) => {
  const [, id] = queryKey;

  console.log("Feature ID:", id);

  const response = await axios.get(`${API_BASE}/featuresDetails?featureId=${id}`);

  return response.data;
};
