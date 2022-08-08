import { Module } from '@nestjs/common';
import { RoleController } from 'entities/role/role.controller';
import { RoleService } from 'entities/role/role.service';
import { PrismaModule } from 'database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
