'use client'
import axios from 'axios';

const API_BASE = 'http://localhost:4000/api';

export const authentication = async (token: string | null) => {
  if (!token) return { success: false };
  
  try {
    const response = await axios.get(`${API_BASE}/authenticate`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return { 
      data: response.data 
    };
  } catch (error) {
    console.error("Authentication failed:", error);
    return { success: false };
  }
}