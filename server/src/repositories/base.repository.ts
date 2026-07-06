// backend/src/repositories/BaseRepository.ts
// Abstract base repository implementation using Mongoose.
// This class handles the direct interaction with the Mongoose ODM, acting as the adapter between
// the domain interface (IBaseRepository) and the infrastructure (MongoDB).
// Feature-specific repositories will extend this class to inherit standard CRUD operations.

import { Model, Document } from 'mongoose';
import { IBaseRepository } from '../core/interfaces/repositories/IBaseRepository';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  // The Mongoose model is injected via the constructor.
  // This allows the repository to operate on any specific Mongoose model.
  protected constructor(protected readonly model: Model<T & Document>) {}

  async findById(id: string): Promise<T | null> {
    const result = await this.model.findById(id).lean();
    return result as T | null;
  }

  async findOne(filter: Partial<T>): Promise<T | null> {
    const result = await this.model.findOne(filter).lean();
    return result as T | null;
  }

  async findAll(filter: Partial<T> = {}): Promise<T[]> {
    const results = await this.model.find(filter).lean();
    return results as T[];
  }

  async create(data: Partial<T>): Promise<T> {
    // Cast data to any because Partial<T> might not match exact Mongoose requirements
    const created = await this.model.create(data as any);
    return (created as any).toObject() as T;
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const updated = await this.model.findByIdAndUpdate(id, data as any, { new: true }).lean();
    return updated as T | null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }
}
