import { IBaseRepository } from './IBaseRepository';
import { InfluencerEntity } from '../../../entities/influencer.entity';

export interface IInfluencerRepository extends IBaseRepository<InfluencerEntity> {
  findByEmail(email: string): Promise<InfluencerEntity | null>;
  updatePassword(id: string, hashedPassword: string): Promise<void>;
  updateVerificationToken(id: string, token: string, expires: Date): Promise<void>;
  updateResetToken(id: string, hashedToken: string, expires: Date): Promise<void>;
  findByResetToken(hashedToken: string): Promise<InfluencerEntity | null>;
  clearResetToken(id: string): Promise<void>;
}
