import { Module } from '@nestjs/common';
import { RoleController } from 'entities/role/role.controller';
import { RoleService } from 'entities/role/role.service';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ErrorModule } from 'common/error/error.module';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
