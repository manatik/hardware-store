import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma-service/prisma.module';
import { ErrorModule } from '@error/error.module';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [TypeController],
  providers: [TypeService],
  exports: [],
})
export class TypeModule {}
