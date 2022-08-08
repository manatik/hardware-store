import { Module } from '@nestjs/common';
import { AuthorizationController } from 'authorization/authorization.controller';
import { AuthorizationService } from 'authorization/authorization.service';
import { PrismaModule } from 'database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
  exports: [],
})
export class AuthorizationModule {}