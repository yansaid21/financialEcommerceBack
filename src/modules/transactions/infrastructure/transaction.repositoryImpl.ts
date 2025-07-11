import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionRepositoryPort } from '../domain/repositories/transaction.repository';
import { Transaction } from '../domain/entities/transaction.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransactionRepositoryImpl implements TransactionRepositoryPort {
  constructor(@InjectModel('Transaction') private readonly model: Model<any>) {}

  async create(data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction> {
    const now = new Date();
    const created = new this.model({
      ...data,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    });
    return created.save();
  }

  async findByUser(userId: string): Promise<Transaction[]> {
    return this.model.find({ userId }).exec();
  }
  async update(id: string, data: Partial<Transaction>): Promise<Transaction | null> {
  return this.model.findOneAndUpdate(
    { id },
    { ...data, updatedAt: new Date() },
    { new: true }
  ).exec();
}

async delete(id: string): Promise<void> {
  await this.model.deleteOne({ id }).exec();
}
async deleteByUserId(userId: string): Promise<void> {
  await this.model.deleteMany({ userId }).exec();
}
}
