import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const API_BASE = 'http://localhost:4000/api'; 
export const getPlaceViewDetails = async ({
  queryKey,
}: QueryFunctionContext<[string, string, string]>) => {
  const [, token, id] = queryKey;

  console.log("Frontend Token:", token);
  console.log("Feature ID:", id);

  const response = await axios.get(`${API_BASE}/featuresDetails?featureId=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
