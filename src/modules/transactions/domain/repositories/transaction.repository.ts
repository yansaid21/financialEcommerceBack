import { Transaction } from '../entities/transaction.entity';

export abstract class TransactionRepositoryPort {
  abstract create(data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction>;
  abstract findByUser(userId: string): Promise<Transaction[]>;
  abstract update(id: string, data: Partial<Transaction>): Promise<Transaction | null>;
  abstract delete(id: string): Promise<void>;
}
