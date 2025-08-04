'use client'
import axios from 'axios';

export const authentication = async (token: string | null) => {
  if (!token) return { success: false, message: 'No token provided' };
  
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/authenticate`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return { 
      success: true,
      data: response.data 
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return { 
      success: false, 
      message: 'Authentication failed' 
    };
  }
}