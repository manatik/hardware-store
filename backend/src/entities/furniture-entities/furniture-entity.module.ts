import { Module } from '@nestjs/common';
import { FurnitureModule } from 'entities/furniture-entity/furniture/furniture.module';

@Module({
  imports: [FurnitureModule],
  exports: [FurnitureModule],
})
export class FurnitureEntityModule {}
