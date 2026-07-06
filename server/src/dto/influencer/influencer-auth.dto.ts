import { z } from 'zod';

export const RegisterInfluencerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export type RegisterInfluencerDTO = z.infer<typeof RegisterInfluencerSchema>;

export const LoginInfluencerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginInfluencerDTO = z.infer<typeof LoginInfluencerSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email format'),
});

export type ForgotPasswordDTO = z.infer<typeof ForgotPasswordSchema>;

export const ResetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordDTO = z.infer<typeof ResetPasswordSchema>;

export interface InfluencerPublicResponseDTO {
  id: string;
  name: string;
  email: string;
  niche: string;
  profilePictureUrl?: string;
  verified: boolean;
  status: string;
  ratingAverage: number;
  ratingCount: number;
  totalCampaignsCompleted: number;
  profileCompletionPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface InfluencerSecureResponseDTO extends InfluencerPublicResponseDTO {
  phone?: string;
  city?: string;
  country: string;
  totalEarnings: number;
  responseRate: number;
  completionRate: number;
}

export interface AuthResponseDTO {
  influencer: InfluencerSecureResponseDTO;
  accessToken: string;
  refreshToken: string;
}

export interface MessageResponseDTO {
  message: string;
}
