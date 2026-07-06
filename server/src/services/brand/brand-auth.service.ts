// server/src/services/brand/brand-auth.service.ts
import { inject, injectable } from 'inversify';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import { TYPES } from '../../core/di/types';
import type { IBrandAuthService } from '../../core/interfaces/services/brand/IBrandAuthService';
import type { IBrandRepository } from '../../core/interfaces/repositories/IBrandRepository';

import type {
  RegisterBrandDTO,
  LoginBrandDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  AuthResponseDTO,
  MessageResponseDTO,
} from '../../dto/brand/brand-auth.dto';

import { BrandMapper } from '../../mappers/brand.mapper';
import { throwError } from '../../utils/throw-error';
import { HttpResponse } from '../../utils/constants/response-messages';
import { HttpStatus } from '../../utils/constants/status-codes';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';
import { sendResetPasswordEmail } from '../../utils/email';
import { logger } from '../../utils/logger';

const SALT_ROUNDS = 10;
const RESET_TOKEN_EXPIRY_MINUTES = 15;

@injectable()
export class BrandAuthService implements IBrandAuthService {
  constructor(
    @inject(TYPES.BrandRepository)
    private brandRepository: IBrandRepository,
  ) {}

  async register(data: RegisterBrandDTO): Promise<AuthResponseDTO> {
    const { email, password, name, phone, website, industry, companySize } = data;

    const existing = await this.brandRepository.findByEmail(email);
    if (existing) {
      throwError(HttpResponse.EMAIL_EXIST, HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const brand = await this.brandRepository.create({
      name,
      email,
      password: hashedPassword,
      phone,
      website,
      industry,
      companySize,
      status: 'pending',
      verified: false,
      verificationStatus: 'unverified',
    });

    if (!brand || !brand._id) {
      throwError(HttpResponse.USER_CREATION_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Non-null assertions: throwError() throws at runtime but TS doesn't infer it as never
    const safeBrand = BrandMapper.toSecureResponse(brand!);
    const accessToken = generateAccessToken(brand!._id.toString(), 'brand');
    const refreshToken = generateRefreshToken(brand!._id.toString(), 'brand');

    return { brand: safeBrand, accessToken, refreshToken };
  }

  async login(data: LoginBrandDTO): Promise<AuthResponseDTO> {
    const { email, password } = data;

    const brand = await this.brandRepository.findByEmail(email);

    if (!brand || !brand.password) {
      throwError(HttpResponse.INVALID_CREDENTIALS, HttpStatus.BAD_REQUEST);
    }

    // Non-null assertions: throwError() throws at runtime but TS doesn't infer it as never
    const isMatch = await bcrypt.compare(password, brand!.password);
    if (!isMatch) {
      throwError(HttpResponse.INVALID_CREDENTIALS, HttpStatus.BAD_REQUEST);
    }

    if (brand!.status === 'blocked' || brand!.status === 'suspended') {
      throwError(HttpResponse.UNAUTHORIZED, HttpStatus.FORBIDDEN);
    }

    if (!brand!._id) {
      throwError(HttpResponse.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    await this.brandRepository.update(brand!._id.toString(), {
      lastLoginAt: new Date(),
    });

    const safeBrand = BrandMapper.toSecureResponse(brand!);
    const accessToken = generateAccessToken(brand!._id.toString(), 'brand');
    const refreshToken = generateRefreshToken(brand!._id.toString(), 'brand');

    return { brand: safeBrand, accessToken, refreshToken };
  }

  async forgotPassword(data: ForgotPasswordDTO): Promise<MessageResponseDTO> {
    const { email } = data;

    const brand = await this.brandRepository.findByEmail(email);

    if (!brand || !brand._id) {
      // Security: do not reveal whether email exists
      logger.warn({ email }, 'Forgot password attempted for non-existent brand email');
      return { message: HttpResponse.RESET_PASS_LINK };
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expires = new Date(Date.now() + RESET_TOKEN_EXPIRY_MINUTES * 60 * 1000);

    await this.brandRepository.updateResetToken(brand._id.toString(), hashedToken, expires);
    await sendResetPasswordEmail(email, rawToken);

    logger.info({ email }, 'Brand password reset token generated and email sent');

    return { message: HttpResponse.RESET_PASS_LINK };
  }

  async resetPassword(data: ResetPasswordDTO): Promise<MessageResponseDTO> {
    const { token, newPassword } = data;

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const brand = await this.brandRepository.findByResetToken(hashedToken);

    if (!brand || !brand._id) {
      throwError(HttpResponse.TOKEN_INVALID_OR_EXPIRED, HttpStatus.BAD_REQUEST);
    }

    // Non-null assertions: throwError() throws at runtime but TS doesn't infer it as never
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await this.brandRepository.updatePassword(brand!._id.toString(), hashedPassword);
    await this.brandRepository.clearResetToken(brand!._id.toString());

    logger.info({ id: brand!._id.toString() }, 'Brand password reset successful');

    return { message: HttpResponse.PASSWORD_RESET_SUCCESS };
  }
}
