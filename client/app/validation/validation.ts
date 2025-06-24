import { z } from 'zod';

export const signUpFormValidate = z
  .object({
    name: z.string().trim().min(2, { message: 'Name is required' }),
    email: z.string().trim().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      }),
    confirmPassword: z.string(),
    lat: z.number(),
    lng: z.number(),
    location: z.string().trim().min(2,"Location is required"),
  })
  .refine((data:any) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof signUpFormValidate>;

export const LoginFormValidate = z
  .object({
    email: z.string().trim().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
  })

export type LoginFormData = z.infer<typeof LoginFormValidate>;

export const ProfileFormValidate = z
  .object({
    name: z.string().trim().min(2, { message: 'Name is required' }),
    email: z.string().trim().email({ message: 'Please enter a valid email.' }).trim(),
    lat: z.number(),
    lng: z.number(),
    location: z.string().trim().min(2,"Location is required"),
  })

export type ProfileFormData = z.infer<typeof ProfileFormValidate>;