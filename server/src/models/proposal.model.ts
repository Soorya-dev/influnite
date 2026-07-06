import mongoose, { Schema } from 'mongoose';

export type ProposalStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn';

export interface ProposalDocument extends mongoose.Document {
  campaignId: mongoose.Types.ObjectId;
  influencerId: mongoose.Types.ObjectId;

  bid: number;
  details?: string;

  status: ProposalStatus;

  createdAt: Date;
  updatedAt: Date;
}

const proposalSchema = new Schema<ProposalDocument>(
  {
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true,
    },

    influencerId: {
      type: Schema.Types.ObjectId,
      ref: 'Influencer',
      required: true,
    },

    bid: { type: Number, required: true },
    details: { type: String },

    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'withdrawn'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export const ProposalModel = mongoose.model<ProposalDocument>('Proposal', proposalSchema);
