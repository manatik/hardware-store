import { Module } from '@nestjs/common';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ErrorModule } from 'common/error/error.module';
import { FeatureService } from './feature.service';
import { FeatureController } from './feature.controller';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [FeatureController],
  providers: [FeatureService],
  exports: [],
})
export class FeatureModule {}
