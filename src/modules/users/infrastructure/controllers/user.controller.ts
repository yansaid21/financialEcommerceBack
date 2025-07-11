import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { GetUserByIdUseCase } from '../../application/use-cases/get-user-by-id.use-case';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users.use-case';


@Controller('users')
export class UserController {
  constructor(private readonly createUser: CreateUserUseCase,
    private readonly getUserById: GetUserByIdUseCase,
    private readonly getAllUsers: GetAllUsersUseCase,
    ) {}
  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.createUser.execute(dto);
    return { message: 'User created', user };
  }
  @Get()
  async findAll() {
    const users = await this.getAllUsers.execute();
    return { users };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.getUserById.execute(id);
    if (!user) return { message: 'User not found' };
    return { user };
  }
}
