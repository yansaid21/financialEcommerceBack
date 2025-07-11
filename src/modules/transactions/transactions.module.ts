import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './infrastructure/schemas/transaction.schema';
import { TransactionController } from './infrastructure/controllers/transaction.controller';
import { TransactionRepositoryImpl } from './infrastructure/transaction.repositoryImpl'; 
import { TransactionRepositoryPort } from './domain/repositories/transaction.repository';
import { CreateTransactionUseCase } from './application/use-cases/cretae-transaction.use-case'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }]),
  ],
  controllers: [TransactionController],
  providers: [
    {
      provide: TransactionRepositoryPort,
      useClass: TransactionRepositoryImpl,
    },
    CreateTransactionUseCase,
  ],
})
export class TransactionsModule {}
