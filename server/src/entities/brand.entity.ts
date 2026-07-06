// entities/brand.entity.ts
import type { Types } from 'mongoose';
export type BrandStatus = 'pending' | 'active' | 'blocked' | 'suspended';
export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export class BrandEntity {
  _id!: Types.ObjectId;
  name!: string;
  email!: string;
  password!: string;

  phone?: string | null;
  website?: string | null;
  industry?: string | null;
  companySize?: string | null;

  status!: BrandStatus;
  verified!: boolean;
  verificationStatus!: VerificationStatus;

  // Used for forgot/reset password flow
  resetToken?: string;
  resetExpires?: Date;
  lastLoginAt?: Date;

  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: Partial<BrandEntity>) {
    Object.assign(this, data);
  }
}
