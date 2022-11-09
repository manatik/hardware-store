import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma-service/prisma.module';
import { ErrorModule } from '@error/error.module';
import { FeatureController } from './feature.controller';
import { FeatureService } from './feature.service';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [FeatureController],
  providers: [FeatureService],
  exports: [],
})
export class FeatureModule {}
