import { injectable } from 'inversify';
import { Influencer } from '../models/influencer.model';
import { IInfluencerRepository } from '../core/interfaces/repositories/IInfluencerRepository';
import { InfluencerEntity } from '../entities/influencer.entity';
import { BaseRepository } from './base.repository';

@injectable()
export class InfluencerRepository
  extends BaseRepository<InfluencerEntity>
  implements IInfluencerRepository
{
  constructor() {
    super(Influencer as any);
  }

  // Find an influencer by email address
  async findByEmail(email: string): Promise<InfluencerEntity | null> {
    return this.model.findOne({ email }).lean().exec();
  }

  // Update the influencer's hashed password
  async updatePassword(id: string, hashedPassword: string): Promise<void> {
    await this.model.findByIdAndUpdate(id, { password: hashedPassword }).exec();
  }

  // Store email verification token and its expiry
  async updateVerificationToken(id: string, token: string, expires: Date): Promise<void> {
    await this.model
      .findByIdAndUpdate(id, {
        verificationToken: token,
        verificationExpires: expires,
      })
      .exec();
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

  // Find influencer with valid (non-expired) reset token
  async findByResetToken(hashedToken: string): Promise<InfluencerEntity | null> {
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
