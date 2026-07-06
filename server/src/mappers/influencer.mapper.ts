import type { InfluencerEntity } from '../entities/influencer.entity';
import type {
  InfluencerPublicResponseDTO,
  InfluencerSecureResponseDTO,
} from '../dto/influencer/influencer-auth.dto';

export class InfluencerMapper {
  static toPublicResponse(influencer: InfluencerEntity): InfluencerPublicResponseDTO {
    return {
      id: influencer._id.toString(),
      name: influencer.name,
      email: influencer.email,
      niche: influencer.niche,
      profilePictureUrl: influencer.profilePictureUrl,
      verified: influencer.verified,
      status: influencer.status,
      ratingAverage: influencer.ratingAverage,
      ratingCount: influencer.ratingCount,
      totalCampaignsCompleted: influencer.totalCampaignsCompleted,
      profileCompletionPercentage: influencer.profileCompletionPercentage,
      createdAt: influencer.createdAt,
      updatedAt: influencer.updatedAt,
    };
  }

  static toSecureResponse(influencer: InfluencerEntity): InfluencerSecureResponseDTO {
    return {
      ...this.toPublicResponse(influencer),
      phone: influencer.phone,
      city: influencer.city,
      country: influencer.country,
      totalEarnings: influencer.totalEarnings,
      responseRate: influencer.responseRate,
      completionRate: influencer.completionRate,
    };
  }
}
