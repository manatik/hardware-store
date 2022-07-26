import { Module } from '@nestjs/common';
import { UserController } from 'common/user/user.controller';
import { UserService } from 'common/user/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
