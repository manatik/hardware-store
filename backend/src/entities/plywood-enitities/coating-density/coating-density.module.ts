import { Module } from '@nestjs/common';
import { CoatingDensityController } from 'entities/plywood-enitities/coating-density/coating-density.controller';
import { CoatingDensityService } from 'entities/plywood-enitities/coating-density/coating-density.service';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ErrorModule } from 'common/error/error.module';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [CoatingDensityController],
  providers: [CoatingDensityService],
  exports: [],
})
export class CoatingDensityModule {}
