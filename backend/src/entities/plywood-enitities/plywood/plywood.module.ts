import { Module } from '@nestjs/common';
import { PlywoodController } from 'entities/plywood-enitity/plywood/plywood.controller';
import { PlywoodService } from 'entities/plywood-enitity/plywood/plywood.service';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ErrorModule } from 'common/error/error.module';
import { SurfaceModule } from 'entities/plywood-enitity/plywood-surface/surface.module';
import { FormatsModule } from 'entities/plywood-enitity/plywood-formats/formats.module';
import { FilesModule } from 'common/files/files.module';

@Module({
  imports: [PrismaModule, ErrorModule, SurfaceModule, FormatsModule, FilesModule],
  controllers: [PlywoodController],
  providers: [PlywoodService],
  exports: [],
})
export class PlywoodModule {}
