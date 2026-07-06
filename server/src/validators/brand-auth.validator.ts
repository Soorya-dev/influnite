// Re-export all brand validation schemas from DTOs — single source of truth
export {
    RegisterBrandSchema,
    LoginBrandSchema,
    ForgotPasswordSchema,
    ResetPasswordSchema,
} from '../dto/brand/brand-auth.dto';
