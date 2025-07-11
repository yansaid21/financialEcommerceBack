import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject(UserRepositoryPort)
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepo.findAll();
  }
}
