import { Module } from '@nestjs/common';
import { FurnitureModule } from './furniture/furniture.module';
import { FeatureModule } from './feature/feature.module';
import { PhotosModule } from './photos/photos.module';
import { ParametersModule } from './parameters/parameters.module';

@Module({
  imports: [FurnitureModule, FeatureModule, PhotosModule, ParametersModule],
  exports: [FurnitureModule, FeatureModule, PhotosModule, ParametersModule],
})
export class FurnitureEntityModule {}
