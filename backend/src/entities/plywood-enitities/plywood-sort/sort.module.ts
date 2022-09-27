import { Module } from '@nestjs/common';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ErrorModule } from 'common/error/error.module';
import { SortController } from 'entities/plywood-enitities/plywood-sort/sort.controller';
import { SortService } from 'entities/plywood-enitities/plywood-sort/sort.service';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [SortController],
  providers: [SortService],
  exports: [],
})
export class SortModule {}
