import { Module } from '@nestjs/common';
import { AuthorizationController } from 'authorization/authorization.controller';
import { AuthorizationService } from 'authorization/authorization.service';

@Module({
  imports: [],
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
  exports: [],
})
export class AuthorizationModule {}