import { Module } from '@nestjs/common';
import { PlywoodModule } from 'entities/plywood-enitities/plywood/plywood.module';
import { CoatingDensityModule } from 'entities/plywood-enitities/coating-density/coating-density.module';
import { FormatsModule } from 'entities/plywood-enitities/formats/formats.module';
import { SortModule } from 'entities/plywood-enitities/sort/sort.module';
import { SurfaceModule } from 'entities/plywood-enitities/surface/surface.module';
import { TypeModule } from 'entities/plywood-enitities/type/type.module';
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
