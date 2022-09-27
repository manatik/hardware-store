import { Module } from '@nestjs/common';
import { FurnitureModule } from 'entities/furniture-entities/furniture/furniture.module';

@Module({
  imports: [FurnitureModule],
  exports: [FurnitureModule],
})
export class FurnitureEntityModule {}
