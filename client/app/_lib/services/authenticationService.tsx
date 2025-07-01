'use client'
import axios from 'axios';
export const authentication = async (token: string | null) => {
  if (!token) return { success: false };
  
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/authenticate`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return { 
      data: response.data 
    };
  } catch (error) {
    return { success: false };
  }
}