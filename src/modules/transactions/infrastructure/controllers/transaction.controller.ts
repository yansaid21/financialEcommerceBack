import { Controller, Post, Body, Get, Query,Inject } from '@nestjs/common';
import { CreateTransactionDto } from '../../application/dto/create-transaction.dto';
import { CreateTransactionUseCase } from '../../application/use-cases/cretae-transaction.use-case'; 
import { TransactionRepositoryPort } from '../../domain/repositories/transaction.repository';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly createUseCase: CreateTransactionUseCase,
    @Inject(TransactionRepositoryPort)
    private readonly repo: TransactionRepositoryPort,
  ) {}

  @Post()
  async create(@Body() dto: CreateTransactionDto) {
    const transaction = await this.createUseCase.execute(dto);
    return { message: 'Transaction created', transaction };
  }

  @Get()
  async findByUser(@Query('userId') userId: string) {
    const transactions = await this.repo.findByUser(userId);
    return { transactions };
  }
}
