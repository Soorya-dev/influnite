import { z } from 'zod';

// --- Zod Validation Schemas ---

export const LoginAdminSchema = z.object({
  email: z.email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// --- DTO Types ---

export type LoginAdminDTO = z.infer<typeof LoginAdminSchema>;
