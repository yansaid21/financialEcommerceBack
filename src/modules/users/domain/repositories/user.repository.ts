import { User } from "src/modules/users/domain/entities/user.entity"; 

export abstract class UserRepositoryPort {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract update(id: string, data: Partial<User>): Promise<User | null>;
  abstract delete(id: string): Promise<void>;
}
