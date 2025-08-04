import { z } from 'zod';

export const signUpFormValidate = z
  .object({
    name: z.string().trim().min(2, { message: 'Name is required' }),
    email: z.string().trim().email({ message: 'Please enter a valid email' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must contain at least one special character',
      })
      .optional(), 
    lat: z.number(),
    lng: z.number(),
    location: z.string().trim().min(2, { message: 'Location is required' }),
    clerkId: z.string().optional(), 
  });

export type SignUpFormData = z.infer<typeof signUpFormValidate>;

export const LoginFormValidate = z.object({
  email: z.string().trim().email({ message: 'Please enter a valid email' }),
  password: z.string().min(1, { message: 'Password is required' }).optional(), 
  clerkId: z.string().optional(), 
});

export type LoginFormData = z.infer<typeof LoginFormValidate>;

export const ProfileFormValidate = z.object({
  name: z.string().trim().min(2, { message: 'Name is required' }),
  email: z.string().trim().email({ message: 'Please enter a valid email' }),
  lat: z.number(),
  lng: z.number(),
  location: z.string().trim().min(2, { message: 'Location is required' }),
});

export type ProfileFormData = z.infer<typeof ProfileFormValidate>;

export const ReviewFormValidate = z.object({
  featureId: z.string().min(1, { message: 'Feature ID is required' }),
  rating: z.number().min(1).max(5, { message: 'Rating must be between 1 and 5' }),
  comment: z.string().optional(),
});

export type ReviewFormData = z.infer<typeof ReviewFormValidate>;

export const FavoriteFormValidate = z.object({
  featureId: z.string().min(1, { message: 'Feature ID is required' }),
});

export type FavoriteFormData = z.infer<typeof FavoriteFormValidate>;

export const SearchFormValidate = z.object({
  searchKeyword: z.string().trim().min(2, { message: 'Search keyword must be at least 2 characters' }),
});

export type SearchFormData = z.infer<typeof SearchFormValidate>;