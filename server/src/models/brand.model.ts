import mongoose, { Schema } from 'mongoose';

export type BrandStatus = 'pending' | 'active' | 'blocked' | 'suspended';
export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export interface BrandDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;

  phone?: string;
  website?: string;
  industry?: string;
  companySize?: string;

  status: BrandStatus;
  verified: boolean;
  verificationStatus: VerificationStatus;

  // For forgot/reset password flow
  resetToken?: string;
  resetExpires?: Date;
  lastLoginAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const brandSchema = new Schema<BrandDocument>(
  {
    name: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },

    phone: { type: String },
    website: { type: String },
    industry: { type: String },
    companySize: { type: String },

    status: {
      type: String,
      enum: ['pending', 'active', 'blocked', 'suspended'],
      default: 'pending',
    },

    verified: { type: Boolean, default: false },

    verificationStatus: {
      type: String,
      enum: ['unverified', 'pending', 'verified', 'rejected'],
      default: 'unverified',
    },

    resetToken: { type: String },
    resetExpires: { type: Date },
    lastLoginAt: { type: Date },
  },
  { timestamps: true },
);

export const BrandModel = mongoose.model<BrandDocument>('Brand', brandSchema);
