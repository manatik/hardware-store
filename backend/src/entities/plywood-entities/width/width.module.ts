import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma-service/prisma.module';
import { ErrorModule } from '@error/error.module';
import { WidthController } from './width.controller';
import { WidthService } from './width.service';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [WidthController],
  providers: [WidthService],
  exports: [],
})
export class WidthModule {}
