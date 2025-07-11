import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject(UserRepositoryPort)
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepo.findById(id);
  }
}
