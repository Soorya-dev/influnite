// core/interfaces/repositories/IBrandRepository.ts
import { IBaseRepository } from './IBaseRepository';
import { BrandEntity } from '../../../entities/brand.entity';

export interface IBrandRepository extends IBaseRepository<BrandEntity> {
    findByEmail(email: string): Promise<BrandEntity | null>;
    updatePassword(id: string, hashedPassword: string): Promise<void>;
    updateResetToken(id: string, hashedToken: string, expires: Date): Promise<void>;
    findByResetToken(hashedToken: string): Promise<BrandEntity | null>;
    clearResetToken(id: string): Promise<void>;
}
