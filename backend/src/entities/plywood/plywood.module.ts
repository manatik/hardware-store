import { Module } from '@nestjs/common';
import { PlywoodController } from 'entities/plywood/plywood.controller';
import { PlywoodService } from 'entities/plywood/plywood.service';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ErrorModule } from 'common/error/error.module';
import { PlywoodSurfaceModule } from 'entities/plywood-surface/plywood-surface.module';
import { PlywoodFormatsModule } from 'entities/plywood-formats/plywood-formats.module';

@Module({
  imports: [PrismaModule, ErrorModule, PlywoodSurfaceModule, PlywoodFormatsModule],
  controllers: [PlywoodController],
  providers: [PlywoodService],
  exports: [],
})
export class PlywoodModule {}
