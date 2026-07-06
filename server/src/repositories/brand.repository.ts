// server/src/repositories/brand.repository.ts
import { injectable } from 'inversify';
import { BrandModel } from '../models/brand.model';
import { IBrandRepository } from '../core/interfaces/repositories/IBrandRepository';
import { BrandEntity } from '../entities/brand.entity';
import { BaseRepository } from './base.repository';

@injectable()
export class BrandRepository extends BaseRepository<BrandEntity> implements IBrandRepository {
  constructor() {
    super(BrandModel as any);
  }

  // Find a brand by email address
  async findByEmail(email: string): Promise<BrandEntity | null> {
    return this.model.findOne({ email }).lean().exec();
  }

  // Update the brand's hashed password
  async updatePassword(id: string, hashedPassword: string): Promise<void> {
    await this.model.findByIdAndUpdate(id, { password: hashedPassword }).exec();
  }

  // Store the hashed password reset token and its expiry
  async updateResetToken(id: string, hashedToken: string, expires: Date): Promise<void> {
    await this.model
      .findByIdAndUpdate(id, {
        resetToken: hashedToken,
        resetExpires: expires,
      })
      .exec();
  }

  // Find brand with valid (non-expired) reset token
  async findByResetToken(hashedToken: string): Promise<BrandEntity | null> {
    return this.model
      .findOne({
        resetToken: hashedToken,
        resetExpires: { $gt: new Date() },
      })
      .lean()
      .exec();
  }

  // Clear reset token fields after successful password reset
  async clearResetToken(id: string): Promise<void> {
    await this.model
      .findByIdAndUpdate(id, {
        $unset: { resetToken: '', resetExpires: '' },
      })
      .exec();
  }
}
