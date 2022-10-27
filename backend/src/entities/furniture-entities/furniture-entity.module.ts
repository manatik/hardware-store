import { Module } from '@nestjs/common';
import { FurnitureModule } from './furniture/furniture.module';
import { FeatureModule } from './feature/feature.module';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [FurnitureModule, FeatureModule, PhotosModule],
  exports: [FurnitureModule, FeatureModule, PhotosModule],
})
export class FurnitureEntityModule {}
