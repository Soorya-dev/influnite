import mongoose,{Schema,Document} from "mongoose";

import { IInfluencer } from "../entities/Influencer.entity";



const InfluencerSchema = new Schema<IInfluencer>(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true, lowercase: true },

    password: { type: String, required: true },

    phone: String,
    city: String,
    state: String,
    country: { type: String, default: "India" },

    bio: String,
    profilePictureUrl: String,

    niche: {
      type: String,
      required: true,
      enum: ["Fashion", "Tech", "Food", "Travel", "Fitness", "Beauty", "Gaming"]
    },

    secondaryNiches: [String],

    languages: [String],

    collaborationRate: { type: Number },

    portfolioUrl: String,

    verified: { type: Boolean, default: false },
    verificationToken: String,
    verificationExpires: Date,
    verifiedAt: Date,

    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },

    resetToken: String,
    resetExpires: Date,

    status: {
      type: String,
      enum: ["active", "blocked", "pending", "suspended"],
      default: "pending"
    },

    lastLoginAt: Date,

    geolocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number] // [longitude, latitude]
      }
    },

    bankAccountNumber: String, // encrypted
    bankIfscCode: String,
    panNumber: String,

    totalCampaignsCompleted: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },

    ratingAverage: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },

    responseRate: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0 },

    profileCompletionPercentage: { type: Number, default: 0 }
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);

export const Influencer = mongoose.model<IInfluencer  >('Influencer',InfluencerSchema);