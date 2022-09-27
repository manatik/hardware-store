import { Module } from '@nestjs/common';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ErrorModule } from 'common/error/error.module';
import { TypeController } from 'entities/plywood-enitities/plywood-type/type.controller';
import { TypeService } from 'entities/plywood-enitities/plywood-type/type.service';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [TypeController],
  providers: [TypeService],
  exports: [],
})
export class TypeModule {}
