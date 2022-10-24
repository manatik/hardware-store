import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ErrorModule } from 'common/error/error.module';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [],
})
export class CategoryModule {}
