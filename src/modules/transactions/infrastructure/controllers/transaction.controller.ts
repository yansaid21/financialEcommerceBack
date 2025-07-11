import { Controller, Post, Body, Get, Query, Inject, Patch, Delete, Param } from '@nestjs/common';
import { CreateTransactionDto } from '../../application/dto/create-transaction.dto';
import { CreateTransactionUseCase } from '../../application/use-cases/cretae-transaction.use-case'; 
import { TransactionRepositoryPort } from '../../domain/repositories/transaction.repository';
import { UpdateTransactionDto } from '../../application/dto/update-transaction.dto'; 
import { UpdateTransactionUseCase } from '../../application/use-cases/update-transaction.use-case';
import { DeleteTransactionUseCase } from '../../application/use-cases/delete-transaction.use-case'; 

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly createUseCase: CreateTransactionUseCase,
    private readonly updateUseCase: UpdateTransactionUseCase,
    private readonly deleteUseCase: DeleteTransactionUseCase,
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
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTransactionDto) {
    const updated = await this.updateUseCase.execute(id, dto);
    return { message: 'Transaction updated', transaction: updated };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteUseCase.execute(id);
    return { message: 'Transaction deleted' };
  }
}
