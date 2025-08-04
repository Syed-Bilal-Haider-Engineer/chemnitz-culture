import { useContextAPI } from '../context/contextAPI';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface OrganizerLoginData {
  email: string;
  password: string;
}

export interface OrganizerSignupData {
  name: string;
  email: string;
  password: string;
  organizationName: string;
  taxId?: string;
}

export interface Organizer {
  id: number;
  name: string;
  email: string;
  organizationName: string;
  taxId?: string;
  isVerified: boolean;
  createdAt: string;
}

export const organizerLogin = async (loginData: OrganizerLoginData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/organizer/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Network error');
  }
};

export const organizerSignup = async (signupData: OrganizerSignupData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/organizer/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Signup failed');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Network error');
  }
};

export const getOrganizerProfile = async (token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/organizer/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch profile');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Network error');
  }
}; 