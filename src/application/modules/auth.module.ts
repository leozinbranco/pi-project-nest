import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { AuthController } from '../controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { appEnv } from '../../shared/app-env';
import { AuthService } from '../../adapters/services/auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: appEnv.auth.secret,
      signOptions: { expiresIn: 300 },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
