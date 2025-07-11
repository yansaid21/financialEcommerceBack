import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './infrastructure/schemas/user.schema';
import { UserController } from './infrastructure/controllers/user.controller';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { UserRepositoryImpl } from './infrastructure/persistence/user.repositoryImpl';
import { UserRepositoryPort } from './domain/repositories/user.repository';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.use-case';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.use-case';


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
    GetUserByIdUseCase,
    GetAllUsersUseCase,
  ],
  exports: [
    {
      provide: UserRepositoryPort,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UsersModule {}
