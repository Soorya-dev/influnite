// server/src/core/di/bindings/influencer.bindings.ts
import { ContainerModule } from 'inversify';
import { TYPES } from '../types';
import { IInfluencerRepository } from '../../interfaces/repositories/IInfluencerRepository';
import { InfluencerRepository } from '../../../repositories/influencer.repository';
import { IInfluencerAuthService } from '../../interfaces/services/influencer/IInfluencerAuthService';
import { InfluencerAuthService } from '../../../services/influencer/influencer-auth.service';
import { InfluencerAuthController } from '../../../controllers/influencer/influencer-auth.controller';

// Inversify v7: ContainerModule callback receives { bind, unbind, ... } options object
export const influencerBindings = new ContainerModule(({ bind }) => {
  bind<IInfluencerRepository>(TYPES.InfluencerRepository).to(InfluencerRepository);
  bind<IInfluencerAuthService>(TYPES.InfluencerAuthService).to(InfluencerAuthService);
  bind<InfluencerAuthController>(TYPES.InfluencerAuthController).to(InfluencerAuthController);
});
