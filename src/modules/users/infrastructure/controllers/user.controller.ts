import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { GetUserByIdUseCase } from '../../application/use-cases/get-user-by-id.use-case';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';
import { UpdateUserDto } from '../../application/dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly createUser: CreateUserUseCase,
    private readonly getUserById: GetUserByIdUseCase,
    private readonly getAllUsers: GetAllUsersUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
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
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const updated = await this.updateUser.execute(id, dto);
    return { message: 'User updated', user: updated };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteUser.execute(id);
    return { message: 'User deleted' };
  }
}
