import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../database/prisma/prisma.module';
import { ErrorModule } from '../../../common/error/error.module';
import { FeatureController } from './feature.controller';
import { FeatureService } from './feature.service';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [FeatureController],
  providers: [FeatureService],
  exports: [],
})
export class FeatureModule {}
