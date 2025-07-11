import { Injectable, Inject } from '@nestjs/common';
import { UserRepositoryPort } from '../../domain/repositories/user.repository';
import { TransactionRepositoryPort } from 'src/modules/transactions/domain/repositories/transaction.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(UserRepositoryPort)
    private readonly userRepo: UserRepositoryPort,
     @Inject(TransactionRepositoryPort)
    private readonly transactionRepo: TransactionRepositoryPort,
  ) {}

  async execute(id: string): Promise<void> {
    await this.userRepo.delete(id);
    await this.transactionRepo.deleteByUserId(id);
  }
}
