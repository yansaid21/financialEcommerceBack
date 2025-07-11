import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../domain/repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepo: UserRepositoryPort) {}

  async execute(dto: CreateUserDto) {
    const exists = await this.userRepo.findByEmail(dto.email);
    if (exists) throw new Error('User already exists');

    return this.userRepo.create(dto);
  }
}
