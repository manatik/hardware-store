import { Module } from '@nestjs/common';
import { FormatsController } from './formats.controller';
import { FormatsService } from './formats.service';
import { PrismaModule } from '@prisma-service/prisma.module';
import { ErrorModule } from '@error/error.module';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [FormatsController],
  providers: [FormatsService],
})
export class FormatsModule {}
