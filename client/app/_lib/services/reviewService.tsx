// services/authAPI.ts
export const addReview = async ({
featureId,
rating,
comment,
token
}: {
  featureId: string;
  rating: number;
  comment: string;
  token: string;
}) => {
  console.log(featureId,rating,comment,token)
  const res = await fetch("http://localhost:4000/api/createReviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
     featureId,
     rating,
     comment
    }),
  });
  console.log("res==>", res);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Interval server error");
  }

  return res.json();
};
