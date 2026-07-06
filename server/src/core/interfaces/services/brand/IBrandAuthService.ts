// core/interfaces/services/brand/IBrandAuthService.ts
import type {
    RegisterBrandDTO,
    LoginBrandDTO,
    ForgotPasswordDTO,
    ResetPasswordDTO,
    AuthResponseDTO,
    MessageResponseDTO,
} from '../../../../dto/brand/brand-auth.dto';

export interface IBrandAuthService {
    register(data: RegisterBrandDTO): Promise<AuthResponseDTO>;
    login(data: LoginBrandDTO): Promise<AuthResponseDTO>;
    forgotPassword(data: ForgotPasswordDTO): Promise<MessageResponseDTO>;
    resetPassword(data: ResetPasswordDTO): Promise<MessageResponseDTO>;
}
