import { Module } from '@nestjs/common';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ErrorModule } from 'common/error/error.module';
import { WidthController } from './width.controller';
import { WidthService } from './width.service';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [WidthController],
  providers: [WidthService],
  exports: [],
})
export class WidthModule {}
