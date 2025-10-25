import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain lowercase letter')
    .regex(/[A-Z]/, 'Password must contain uppercase letter')
    .regex(/[0-9]/, 'Password must contain number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const petSchema = z.object({
  name: z.string().min(1, 'Pet name is required'),
  type: z.enum(['dog', 'cat', 'bird', 'other']),
  breed: z.string().optional(),
  age: z.number().min(0).max(50).optional(),
  color: z.string().optional(),
  description: z.string().optional(),
});

export const tagAssignmentSchema = z.object({
  tagId: z.string().min(1, 'Tag ID is required'),
  petId: z.string().min(1, 'Pet selection is required'),
});

export const tagActivationSchema = z.object({
  tagId: z.string().min(1, 'Tag ID is required'),
  activationCode: z.string().min(6, 'Activation code must be at least 6 characters'),
});

export const feedbackSchema = z.object({
  message: z.string().min(10, 'Feedback must be at least 10 characters'),
});

export const twoFactorSchema = z.object({
  code: z.string().length(6, 'Code must be 6 digits'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type PetFormData = z.infer<typeof petSchema>;
export type TagAssignmentFormData = z.infer<typeof tagAssignmentSchema>;
export type TagActivationFormData = z.infer<typeof tagActivationSchema>;
export type FeedbackFormData = z.infer<typeof feedbackSchema>;
export type TwoFactorFormData = z.infer<typeof twoFactorSchema>;
