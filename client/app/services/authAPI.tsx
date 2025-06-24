export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  console.log("email=>",email,"password=>",password)
  const res = await fetch("http://localhost:4000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
   console.log("res",res);
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
  const res = await fetch("http://localhost:4000/api/signup", {
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
 console.log("res==>",res)
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Interval server error");
  }

  return res.json();
};


// services/authAPI.ts
export const updateProfile = async ({
  name,
  email,
  lat,
  lng,
  location,
}: {
  name: string;
  email: string;
  lat: number;
  lng: number;
  location: string;
}) => {
  const res = await fetch("http://localhost:4000/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      lat,
      lng,
      location,
    }),
  });
 console.log("res==>",res)
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Interval server error");
  }

  return res.json();
};