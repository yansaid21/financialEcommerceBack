import { Injectable, Inject } from '@nestjs/common';
import { TransactionRepositoryPort } from '../../domain/repositories/transaction.repository';

@Injectable()
export class DeleteTransactionUseCase {
  constructor(
    @Inject(TransactionRepositoryPort)
    private readonly repo: TransactionRepositoryPort,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
