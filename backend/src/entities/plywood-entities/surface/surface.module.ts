import { Module } from '@nestjs/common';
import { SurfaceController } from './surface.controller';
import { SurfaceService } from './surface.service';
import { PrismaModule } from '@prisma-service/prisma.module';
import { ErrorModule } from '@error/error.module';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [SurfaceController],
  providers: [SurfaceService],
})
export class SurfaceModule {}
