import { Module } from '@nestjs/common';
import { FurnitureModule } from './furniture/furniture.module';
import { FeatureModule } from './feature/feature.module';

@Module({
  imports: [FurnitureModule, FeatureModule],
  exports: [FurnitureModule, FeatureModule],
})
export class FurnitureEntityModule {}
