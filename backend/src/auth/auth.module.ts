import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { envs } from 'src/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtStrategyBearer } from './strategy/jwt-bearer.strategy';

@Module({
  providers: [AuthService, JwtStrategyBearer],
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: envs.jwt.secret,
      signOptions: {
        expiresIn: envs.jwt.duration,
      },
    }),
  ],
})
export class AuthModule {}
