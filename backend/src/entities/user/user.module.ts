import { Module } from '@nestjs/common';
import { UserController } from 'entities/user/user.controller';
import { UserService } from 'entities/user/user.service';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ErrorModule } from "../../common/error/error.module";

@Module({
  imports: [
    PrismaModule,
    ErrorModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
