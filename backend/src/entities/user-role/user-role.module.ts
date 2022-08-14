import { Module } from '@nestjs/common';
import { UserRoleController } from 'entities/user-role/user-role.controller';
import { PrismaModule } from 'database/prisma/prisma.module';
import { UserRoleService } from 'entities/user-role/user-role.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserRoleController],
  providers: [UserRoleService],
})
export class UserRoleModule {}
