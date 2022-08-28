import { Module } from '@nestjs/common';
import { PlywoodSurfaceController } from 'entities/plywood-surface/plywood-surface.controller';
import { PlywoodSurfaceService } from 'entities/plywood-surface/plywood-surface.service';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ErrorModule } from 'common/error/error.module';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [PlywoodSurfaceController],
  providers: [PlywoodSurfaceService],
})
export class PlywoodSurfaceModule {}
