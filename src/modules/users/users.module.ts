import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './infrastructure/schemas/user.schema';
import { UserController } from './infrastructure/controllers/user.controller';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';

import { UserRepositoryImpl } from './infrastructure/persistence/user.repositoryImpl';
import { UserRepositoryPort } from './domain/repositories/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: UserRepositoryPort,
      useClass: UserRepositoryImpl,
    },
    CreateUserUseCase,
  ],
  exports: [
    {
      provide: UserRepositoryPort,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UsersModule {}
