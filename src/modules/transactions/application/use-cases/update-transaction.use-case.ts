import { Injectable, Inject } from '@nestjs/common';
import { TransactionRepositoryPort } from '../../domain/repositories/transaction.repository';
import { UpdateTransactionDto } from '../dto/update-transaction.dto'; 
import { Transaction } from '../../domain/entities/transaction.entity';

@Injectable()
export class UpdateTransactionUseCase {
  constructor(
    @Inject(TransactionRepositoryPort)
    private readonly repo: TransactionRepositoryPort,
  ) {}

  async execute(id: string, data: UpdateTransactionDto): Promise<Transaction | null> {
    const { amount, description, isIncome, date } = data;

    const patchData: Partial<Transaction> = {
      ...(amount !== undefined && { amount }),
      ...(description !== undefined && { description }),
      ...(isIncome !== undefined && { isIncome }),
      ...(date !== undefined && { date: new Date(date) }),
    };

    return this.repo.update(id, patchData);
  }
}
