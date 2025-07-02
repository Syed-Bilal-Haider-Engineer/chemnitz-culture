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

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/createReviews`, {
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
 return res.json()
};

export const removeReview =async ({reviewId,token}:{reviewId:string, token:string}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/deleteReviews`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
     reviewId
    }),
  });
 return res.json()
}

export const updateReview =async ({reviewId,rating,comment,token}:{
  reviewId: string;
  rating: number;
  comment: string;
  token: string;
}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/updateReviews`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      rating,
      comment,
     reviewId
    }), 
  });
 return res.json()
}

export const getReview =async ({reviewId,token}:{
  reviewId: string;
  token: string;
}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/getFeatureReviews?reviewId=${reviewId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });
 return res.json()
}