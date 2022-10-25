import { Module } from '@nestjs/common';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ErrorModule } from 'common/error/error.module';
import { SortController } from './sort.controller';
import { SortService } from './sort.service';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [SortController],
  providers: [SortService],
  exports: [],
})
export class SortModule {}
