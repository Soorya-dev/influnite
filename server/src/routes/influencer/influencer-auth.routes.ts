import express from 'express';
import container from '../../core/di/container';
import { TYPES } from '../../core/di/types';
import { InfluencerAuthController } from '../../controllers/influencer/influencer-auth.controller';
import { validateRequest } from '../../middleware/validation.middleware';
import { asyncHandler } from '../../middleware/async-handler.middleware';
import {
  RegisterInfluencerSchema,
  LoginInfluencerSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from '../../validators/influencer-auth.validator';

const router = express.Router();
const controller = container.get<InfluencerAuthController>(TYPES.InfluencerAuthController);

// POST /api/influencer/auth/register
router.post(
  '/register',
  validateRequest(RegisterInfluencerSchema),
  asyncHandler(controller.register),
);

// POST /api/influencer/auth/login
router.post('/login', validateRequest(LoginInfluencerSchema), asyncHandler(controller.login));

// POST /api/influencer/auth/forgot-password
router.post(
  '/forgot-password',
  validateRequest(ForgotPasswordSchema),
  asyncHandler(controller.forgotPassword),
);

// POST /api/influencer/auth/reset-password
router.post(
  '/reset-password',
  validateRequest(ResetPasswordSchema),
  asyncHandler(controller.resetPassword),
);

export default router;
