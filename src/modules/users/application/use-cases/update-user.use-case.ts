import { Injectable, Inject } from '@nestjs/common';
import { UserRepositoryPort } from '../../domain/repositories/user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(UserRepositoryPort)
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async execute(id: string, data: UpdateUserDto): Promise<User | null> {
    return this.userRepo.update(id, data);
  }
}
