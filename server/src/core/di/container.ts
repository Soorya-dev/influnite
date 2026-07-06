// server/src/core/di/container.ts
// Inversify DI container — registers all bindings synchronously
import { Container } from 'inversify';
import { influencerBindings } from './bindings/influencer.bindings';
import { brandBindings } from './bindings/brand.bindings';

const container = new Container();

// Load role-based bindings
container.load(influencerBindings);
container.load(brandBindings);

export default container;
