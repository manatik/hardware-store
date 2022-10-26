import { Module } from '@nestjs/common';
import { FurnitureController } from 'entities/furniture-entities/furniture/furniture.controller';
import { FurnitureService } from 'entities/furniture-entities/furniture/furniture.service';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ErrorModule } from 'common/error/error.module';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [FurnitureController],
  providers: [FurnitureService],
  exports: [],
})
export class FurnitureModule {}
