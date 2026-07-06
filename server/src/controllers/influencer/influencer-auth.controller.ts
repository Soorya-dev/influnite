import type { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/di/types';
import type { IInfluencerAuthService } from '../../core/interfaces/services/influencer/IInfluencerAuthService';
import { setAuthCookies } from '../../utils/cookie';
import { HttpResponse } from '../../utils/constants/response-messages';
import { HttpStatus } from '../../utils/constants/status-codes';

@injectable()
export class InfluencerAuthController {
  constructor(
    @inject(TYPES.InfluencerAuthService)
    private authService: IInfluencerAuthService,
  ) {}

  register = async (req: Request, res: Response): Promise<void> => {
    const result = await this.authService.register(req.body);

    setAuthCookies(res, result.accessToken, result.refreshToken);

    res.status(HttpStatus.CREATED).json({
      ok: true,
      message: HttpResponse.USER_CREATION_SUCCESS,
      data: {
        influencer: result.influencer,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const result = await this.authService.login(req.body);

    setAuthCookies(res, result.accessToken, result.refreshToken);

    res.status(HttpStatus.OK).json({
      ok: true,
      message: HttpResponse.LOGIN_SUCCESS,
      data: {
        influencer: result.influencer,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  };

  forgotPassword = async (req: Request, res: Response): Promise<void> => {
    await this.authService.forgotPassword(req.body);

    res.status(HttpStatus.OK).json({
      ok: true,
      message: HttpResponse.RESET_PASS_LINK,
      data: null,
    });
  };

  resetPassword = async (req: Request, res: Response): Promise<void> => {
    await this.authService.resetPassword(req.body);

    res.status(HttpStatus.OK).json({
      ok: true,
      message: HttpResponse.PASSWORD_RESET_SUCCESS,
      data: null,
    });
  };
}
