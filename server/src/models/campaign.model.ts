import mongoose, { Schema } from 'mongoose';

export type CampaignStatus =
  | 'draft'
  | 'open'
  | 'in_progress'
  | 'completed'
  | 'closed'
  | 'cancelled';

export interface CampaignDocument extends mongoose.Document {
  title: string;
  brief: string;
  budget: number;
  budgetCurrency: string;

  status: CampaignStatus;

  brandId: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const campaignSchema = new Schema<CampaignDocument>(
  {
    title: { type: String, required: true, trim: true },
    brief: { type: String, required: true },

    budget: { type: Number, required: true },
    budgetCurrency: { type: String, default: 'INR' },

    status: {
      type: String,
      enum: ['draft', 'open', 'in_progress', 'completed', 'closed', 'cancelled'],
      default: 'draft',
    },

    brandId: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
  },
  { timestamps: true },
);

export const CampaignModel = mongoose.model<CampaignDocument>('Campaign', campaignSchema);
