import { Types } from "mongoose";

export interface IInfluencer {
  _id? : Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone?: string;
  city?: string;
  state?: string;
  country: string;
  bio?: string;
  profilePictureUrl?: string;
  niche: string;
  secondaryNiches?: string[];
  languages?: string[];
  collaborationRate?: number;
  portfolioUrl?: string;
  verified: boolean;
  verificationToken?: string;
  verificationExpires?: Date;
  verifiedAt?: Date;
  emailVerified: boolean;
  phoneVerified: boolean;
  resetToken?: string;
  resetExpires?: Date;
  status: "active" | "blocked" | "pending" | "suspended";
  lastLoginAt?: Date;
  geolocation?: {
    type: "Point";
    coordinates: [number, number];
  };
  bankAccountNumber?: string; // store encrypted
  bankIfscCode?: string;
  panNumber?: string;
  totalCampaignsCompleted: number;
  totalEarnings: number;
  ratingAverage: number;
  ratingCount: number;
  responseRate: number;
  completionRate: number;
  profileCompletionPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

