import { Module } from '@nestjs/common';
import { PlywoodController } from 'entities/plywood-enitities/plywood/plywood.controller';
import { PlywoodService } from 'entities/plywood-enitities/plywood/plywood.service';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ErrorModule } from 'common/error/error.module';
import { SurfaceModule } from 'entities/plywood-enitities/surface/surface.module';
import { FormatsModule } from 'entities/plywood-enitities/formats/formats.module';
import { FilesModule } from 'common/files/files.module';

@Module({
  imports: [PrismaModule, ErrorModule, SurfaceModule, FormatsModule, FilesModule],
  controllers: [PlywoodController],
  providers: [PlywoodService],
  exports: [],
})
export class PlywoodModule {}
