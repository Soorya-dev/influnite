// server/src/core/di/types.ts
export const TYPES = {
  // Influencer
  InfluencerRepository: Symbol.for('InfluencerRepository'),
  InfluencerAuthService: Symbol.for('InfluencerAuthService'),
  InfluencerAuthController: Symbol.for('InfluencerAuthController'),

  // Brand
  BrandRepository: Symbol.for('BrandRepository'),
  BrandAuthService: Symbol.for('BrandAuthService'),
  BrandAuthController: Symbol.for('BrandAuthController'),
};
