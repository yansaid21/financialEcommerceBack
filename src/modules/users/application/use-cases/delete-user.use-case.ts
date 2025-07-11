import { Injectable, Inject } from '@nestjs/common';
import { UserRepositoryPort } from '../../domain/repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(UserRepositoryPort)
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async execute(id: string): Promise<void> {
    await this.userRepo.delete(id);
  }
}
