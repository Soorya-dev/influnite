// server\src\services\influencer\influencer-auth.service.ts
import { inject, injectable } from 'inversify';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import { TYPES } from '../../core/di/types';
import type { IInfluencerAuthService } from '../../core/interfaces/services/influencer/IInfluencerAuthService';
import type { IInfluencerRepository } from '../../core/interfaces/repositories/IInfluencerRepository';

import type {
  RegisterInfluencerDTO,
  LoginInfluencerDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  AuthResponseDTO,
  MessageResponseDTO,
} from '../../dto/influencer/influencer-auth.dto';

import { InfluencerMapper } from '../../mappers/influencer.mapper';
import { throwError } from '../../utils/throw-error';
import { HttpResponse } from '../../utils/constants/response-messages';
import { HttpStatus } from '../../utils/constants/status-codes';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';
import { sendResetPasswordEmail } from '../../utils/email';
import { logger } from '../../utils/logger';

const SALT_ROUNDS = 10;
const RESET_TOKEN_EXPIRY_MINUTES = 15;

@injectable()
export class InfluencerAuthService implements IInfluencerAuthService {
  constructor(
    @inject(TYPES.InfluencerRepository)
    private influencerRepository: IInfluencerRepository,
  ) { }

  async register(data: RegisterInfluencerDTO): Promise<AuthResponseDTO> {
    const { email, password, name } = data;

    const existing = await this.influencerRepository.findByEmail(email);
    if (existing) {
      throwError(HttpResponse.EMAIL_EXIST, HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const influencer = await this.influencerRepository.create({
      name,
      email,
      password: hashedPassword,
      status: 'pending',
      emailVerified: false,
      phoneVerified: false,
      verified: false,
    });

    if (!influencer || !influencer._id) {
      throwError(HttpResponse.USER_CREATION_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Use mapper to transform to secure response DTO
    // Non-null assertions: throwError() throws at runtime but TS doesn't infer it as never
    const safeInfluencer = InfluencerMapper.toSecureResponse(influencer!);

    const accessToken = generateAccessToken(influencer!._id.toString(), 'influencer');
    const refreshToken = generateRefreshToken(influencer!._id.toString(), 'influencer');

    return {
      influencer: safeInfluencer,
      accessToken,
      refreshToken
    };
  }

  async login(data: LoginInfluencerDTO): Promise<AuthResponseDTO> {
    const { email, password } = data;

    const influencer = await this.influencerRepository.findByEmail(email);

    if (!influencer || !influencer.password) {
      throwError(HttpResponse.INVALID_CREDENTIALS, HttpStatus.BAD_REQUEST);
    }

    // Non-null assertions: throwError() throws at runtime but TS doesn't infer it as never
    const isMatch = await bcrypt.compare(password, influencer!.password);
    if (!isMatch) {
      throwError(HttpResponse.INVALID_CREDENTIALS, HttpStatus.BAD_REQUEST);
    }

    if (influencer!.status === 'blocked' || influencer!.status === 'suspended') {
      throwError(HttpResponse.UNAUTHORIZED, HttpStatus.FORBIDDEN);
    }

    if (!influencer!._id) {
      throwError(HttpResponse.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    await this.influencerRepository.update(influencer!._id.toString(), {
      lastLoginAt: new Date(),
    });

    // Use mapper to transform to secure response DTO
    const safeInfluencer = InfluencerMapper.toSecureResponse(influencer!);

    const accessToken = generateAccessToken(influencer!._id.toString(), 'influencer');
    const refreshToken = generateRefreshToken(influencer!._id.toString(), 'influencer');

    return {
      influencer: safeInfluencer,
      accessToken,
      refreshToken
    };
  }

  async forgotPassword(data: ForgotPasswordDTO): Promise<MessageResponseDTO> {
    const { email } = data;

    const influencer = await this.influencerRepository.findByEmail(email);

    if (!influencer || !influencer._id) {
      logger.warn({ email }, 'Forgot password attempted for non-existent email');
      return { message: HttpResponse.RESET_PASS_LINK };
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expires = new Date(Date.now() + RESET_TOKEN_EXPIRY_MINUTES * 60 * 1000);

    await this.influencerRepository.updateResetToken(
      influencer!._id.toString(),
      hashedToken,
      expires,
    );

    await sendResetPasswordEmail(email, rawToken);
    logger.info({ email }, 'Password reset token generated and email sent');

    return { message: HttpResponse.RESET_PASS_LINK };
  }

  async resetPassword(data: ResetPasswordDTO): Promise<MessageResponseDTO> {
    const { token, password } = data;

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const influencer = await this.influencerRepository.findByResetToken(hashedToken);

    if (!influencer || !influencer._id) {
      throwError(HttpResponse.TOKEN_INVALID_OR_EXPIRED, HttpStatus.BAD_REQUEST);
    }

    // Non-null assertions: throwError() throws at runtime but TS doesn't infer it as never
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await this.influencerRepository.updatePassword(influencer!._id.toString(), hashedPassword);
    await this.influencerRepository.clearResetToken(influencer!._id.toString());

    logger.info({ id: influencer!._id.toString() }, 'Password reset successful');

    return { message: HttpResponse.PASSWORD_RESET_SUCCESS };
  }
}
