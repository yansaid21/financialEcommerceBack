import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryPort } from '../../domain/repositories/user.repository';

@Injectable()
export class UserRepositoryImpl implements UserRepositoryPort {
  constructor(@InjectModel('User') private readonly userModel: Model<any>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findOne({ id }).exec();
  }

  async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const now = new Date();
    const newUser = new this.userModel({
      ...user,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    });
    return newUser.save();
  }
  async findAll(): Promise<User[]> {
  return this.userModel.find().exec();
}

}
