import { Module } from '@nestjs/common';
import { UserController } from 'entities/user/user.controller';
import { UserService } from 'entities/user/user.service';
import { PrismaModule } from 'database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
