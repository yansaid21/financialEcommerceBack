import { Injectable, Inject } from '@nestjs/common';
import { TransactionRepositoryPort } from '../../domain/repositories/transaction.repository';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Transaction } from '../../domain/entities/transaction.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    @Inject(TransactionRepositoryPort)
    private readonly repo: TransactionRepositoryPort,
  ) {}

  async execute(dto: CreateTransactionDto): Promise<Transaction> {
    const now = new Date();
    const date = dto.date ? new Date(dto.date) : now;

    return this.repo.create({
      userId: dto.userId,
      amount: dto.amount,
      description: dto.description,
      isIncome: dto.isIncome,
      date,
    });
  }
}
