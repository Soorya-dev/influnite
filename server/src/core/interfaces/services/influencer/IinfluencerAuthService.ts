// core/interfaces/services/influencer/IInfluencerAuthService.ts
import type {
  RegisterInfluencerDTO,
  LoginInfluencerDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  AuthResponseDTO,
  MessageResponseDTO,
} from '../../../../dto/influencer/influencer-auth.dto';

export interface IInfluencerAuthService {
  register(data: RegisterInfluencerDTO): Promise<AuthResponseDTO>;
  login(data: LoginInfluencerDTO): Promise<AuthResponseDTO>;
  forgotPassword(data: ForgotPasswordDTO): Promise<MessageResponseDTO>;
  resetPassword(data: ResetPasswordDTO): Promise<MessageResponseDTO>;
}
