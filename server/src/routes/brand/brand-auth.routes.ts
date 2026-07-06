// server/src/routes/brand/brand-auth.routes.ts
import express from 'express';
import container from '../../core/di/container';
import { TYPES } from '../../core/di/types';
import type { BrandAuthController } from '../../controllers/brand/brand-auth.controller';
import { validateRequest } from '../../middleware/validation.middleware';
import { asyncHandler } from '../../middleware/async-handler.middleware';
import {
  RegisterBrandSchema,
  LoginBrandSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from '../../validators/brand-auth.validator';

const router = express.Router();
const controller = container.get<BrandAuthController>(TYPES.BrandAuthController);

// POST /api/brand/auth/register
router.post('/register', validateRequest(RegisterBrandSchema), asyncHandler(controller.register));

// POST /api/brand/auth/login
router.post('/login', validateRequest(LoginBrandSchema), asyncHandler(controller.login));

// POST /api/brand/auth/forgot-password
router.post(
  '/forgot-password',
  validateRequest(ForgotPasswordSchema),
  asyncHandler(controller.forgotPassword),
);

// POST /api/brand/auth/reset-password
router.post(
  '/reset-password',
  validateRequest(ResetPasswordSchema),
  asyncHandler(controller.resetPassword),
);

export default router;
