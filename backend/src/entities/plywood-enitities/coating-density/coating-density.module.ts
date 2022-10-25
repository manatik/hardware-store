import { Module } from '@nestjs/common';
import { CoatingDensityController } from './coating-density.controller';
import { CoatingDensityService } from './coating-density.service';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ErrorModule } from 'common/error/error.module';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [CoatingDensityController],
  providers: [CoatingDensityService],
  exports: [],
})
export class CoatingDensityModule {}
