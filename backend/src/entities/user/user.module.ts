import { Module } from '@nestjs/common';
import { UserController } from 'entities/user/user.controller';
import { UserService } from 'entities/user/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
