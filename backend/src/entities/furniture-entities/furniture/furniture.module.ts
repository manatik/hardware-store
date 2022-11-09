import { Module } from '@nestjs/common';
import { FurnitureController } from '@furniture/furniture/furniture.controller';
import { FurnitureService } from '@furniture/furniture/furniture.service';
import { PrismaModule } from '@prisma-service/prisma.module';
import { ErrorModule } from '@error/error.module';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [FurnitureController],
  providers: [FurnitureService],
  exports: [],
})
export class FurnitureModule {}
