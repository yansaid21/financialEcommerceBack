import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/infrastructure/schemas/user.schema';

import { AuthService } from './application/services/auth.service'; 
import { AuthController } from './infrastructure/controllers/auth.controller';
import { GoogleStrategy } from './infrastructure/strategies/google.strategy';

import { UserRepositoryImpl } from '../users/infrastructure/persistence/user.repositoryImpl';
import { UserRepositoryPort } from '../users/domain/repositories/user.repository';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    AuthService,
    {
      provide: UserRepositoryPort,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class AuthModule {}
