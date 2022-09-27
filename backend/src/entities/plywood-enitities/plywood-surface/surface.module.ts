import { Module } from '@nestjs/common';
import { SurfaceController } from 'entities/plywood-enitities/plywood-surface/surface.controller';
import { SurfaceService } from 'entities/plywood-enitities/plywood-surface/surface.service';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ErrorModule } from 'common/error/error.module';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [SurfaceController],
  providers: [SurfaceService],
})
export class SurfaceModule {}
