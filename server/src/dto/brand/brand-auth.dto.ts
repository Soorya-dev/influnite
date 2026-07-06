//dto/brand/brand-auth.dto.ts
import { z } from 'zod';
import type { BrandStatus, VerificationStatus } from '../../entities/brand.entity';

// --- Zod Validation Schemas ---

export const RegisterBrandSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  phone: z.string().optional(),
  website: z.string().url('Invalid URL format').optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
});

export const LoginBrandSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email format'),
});

export const ResetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// --- DTO Types ---

export type RegisterBrandDTO = z.infer<typeof RegisterBrandSchema>;
export type LoginBrandDTO = z.infer<typeof LoginBrandSchema>;
export type ForgotPasswordDTO = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordDTO = z.infer<typeof ResetPasswordSchema>;

export interface BrandPublicResponseDTO {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  website?: string | null;
  industry?: string | null;
  companySize?: string | null;
  status: BrandStatus;
  verified: boolean;
  verificationStatus: VerificationStatus;
  createdAt: Date;
}

export interface BrandSecureResponseDTO extends BrandPublicResponseDTO {}

export interface AuthResponseDTO {
  brand: BrandSecureResponseDTO;
  accessToken: string;
  refreshToken: string;
}

export interface MessageResponseDTO {
  message: string;
}
