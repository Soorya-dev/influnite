import mongoose, { Schema } from 'mongoose';

export type AdminRole = 'admin' | 'super_admin' | 'moderator';

export interface AdminDocument extends mongoose.Document {
  email: string;
  password: string;
  role: AdminRole;
  name?: string;
  phone?: string;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema = new Schema<AdminDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'super_admin', 'moderator'],
      default: 'admin',
    },
    name: { type: String },
    phone: { type: String },
    lastLoginAt: { type: Date },
  },
  { timestamps: true },
);

export const AdminModel = mongoose.model<AdminDocument>('Admin', adminSchema);
