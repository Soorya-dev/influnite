// server/src/core/di/bindings/brand.bindings.ts
import { ContainerModule } from 'inversify';
import { TYPES } from '../types';
import type { IBrandRepository } from '../../interfaces/repositories/IBrandRepository';
import { BrandRepository } from '../../../repositories/brand.repository';
import type { IBrandAuthService } from '../../interfaces/services/brand/IBrandAuthService';
import { BrandAuthService } from '../../../services/brand/brand-auth.service';
import { BrandAuthController } from '../../../controllers/brand/brand-auth.controller';

// Inversify v7: ContainerModule callback receives { bind, unbind, ... } options object
export const brandBindings = new ContainerModule(({ bind }) => {
  bind<IBrandRepository>(TYPES.BrandRepository).to(BrandRepository);
  bind<IBrandAuthService>(TYPES.BrandAuthService).to(BrandAuthService);
  bind<BrandAuthController>(TYPES.BrandAuthController).to(BrandAuthController);
});
