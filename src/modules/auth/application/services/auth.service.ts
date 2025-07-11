import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryPort } from '../../../users/domain/repositories/user.repository';
import { User } from '../../../users/domain/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(UserRepositoryPort)
    private readonly userRepo: UserRepositoryPort,
  ) {}

  generateToken(user: User): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
  }

  async handleGoogleRedirect(payload: { email: string; name: string }): Promise<string> {
    const { email, name } = payload;

    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      // Redirige al frontend para completar registro
      return `http://localhost:3000/register?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`;
    }

    const token = this.generateToken(user);
    return `http://localhost:3000/dashboard?token=${token}`;
  }
}
