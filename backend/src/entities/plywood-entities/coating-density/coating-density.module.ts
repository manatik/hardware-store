import { Module } from '@nestjs/common';
import { CoatingDensityController } from './coating-density.controller';
import { CoatingDensityService } from './coating-density.service';
import { PrismaModule } from '@prisma-service/prisma.module';
import { ErrorModule } from '@error/error.module';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [CoatingDensityController],
  providers: [CoatingDensityService],
  exports: [],
})
export class CoatingDensityModule {}
