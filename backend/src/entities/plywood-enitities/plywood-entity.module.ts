import { Module } from '@nestjs/common';
import { PlywoodModule } from 'entities/plywood-enitity/plywood/plywood.module';
import { CoatingDensityModule } from 'entities/plywood-enitity/coating-density/coating-density.module';
import { FormatsModule } from 'entities/plywood-enitity/plywood-formats/formats.module';
import { SortModule } from 'entities/plywood-enitity/plywood-sort/sort.module';
import { SurfaceModule } from 'entities/plywood-enitity/plywood-surface/surface.module';
import { TypeModule } from 'entities/plywood-enitity/plywood-type/type.module';

@Module({
  imports: [PlywoodModule, CoatingDensityModule, FormatsModule, SortModule, SurfaceModule, TypeModule],
  exports: [PlywoodModule, CoatingDensityModule, FormatsModule, SortModule, SurfaceModule, TypeModule],
})
export class PlywoodEntityModule {}
