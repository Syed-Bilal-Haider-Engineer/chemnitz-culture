import { QueryFunctionContext } from "@tanstack/react-query";
export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  console.log("process.env.NEXT_PUBLIC_API_BASE=?",process.env.NEXT_PUBLIC_API_BASE,email)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  console.log("res=>",res);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Login failed");
  }
  return res.json();
}

// services/authAPI.ts
export const signupUser = async ({
  name,
  email,
  password,
  lat,
  lng,
  location,
}: {
  name: string;
  email: string;
  password: string;
  lat: number;
  lng: number;
  location: string;
}) => {
  console.log("name",name)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      lat,
      lng,
      location,
    }),
  });
 
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Interval server error");
  }

  return res.json();
};

export const getUserProfile = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>) => {
  const [, token] = queryKey;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/getUserProfileDetails`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Interval server error");
  }

  return res.json();
};

export const updateProfile = async ({name, lat, lng, location,token}: {
  name: string;
  lat: number;
  lng: number;
  location: string;
  token: string;
}) => {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/updateUser`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      lat,
      lng,
      location,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Interval server error");
  }

  return res.json();
};
