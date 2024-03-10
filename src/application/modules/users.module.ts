import { Module } from '@nestjs/common';
import { UsersService } from '../../services/users.service';
import { PrismaModule } from 'src/adapters/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
