import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { CreateUserDto } from '../../application/dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.createUser.execute(dto);
    return { message: 'User created', user };
  }
}
