// backend/src/core/interfaces/repositories/IBaseRepository.ts
// Generic interface defining the contract for database operations.
// Services depend on this abstraction, ensuring decoupling from the specific persistence layer (Mongoose, SQL, etc.).

export interface IBaseRepository<T> {
  findById(id: string): Promise<T | null>;
  findOne(filter: Partial<T>): Promise<T | null>;
  findAll(filter?: Partial<T>): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
