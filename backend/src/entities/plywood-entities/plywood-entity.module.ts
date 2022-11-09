import { Module } from '@nestjs/common';
import { PlywoodModule } from './plywood/plywood.module';
import { CoatingDensityModule } from './coating-density/coating-density.module';
import { FormatsModule } from './formats/formats.module';
import { SortModule } from './sort/sort.module';
import { SurfaceModule } from './surface/surface.module';
import { TypeModule } from './type/type.module';
import { FeatureModule } from './feature/feature.module';
import { WidthModule } from './width/width.module';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [
    PlywoodModule,
    CoatingDensityModule,
    FormatsModule,
    SortModule,
    SurfaceModule,
    TypeModule,
    FeatureModule,
    WidthModule,
    PhotosModule,
  ],
  exports: [
    PlywoodModule,
    CoatingDensityModule,
    FormatsModule,
    SortModule,
    SurfaceModule,
    TypeModule,
    FeatureModule,
    WidthModule,
    PhotosModule,
  ],
})
export class PlywoodEntityModule {}
