import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma-service/prisma.module';
import { ErrorModule } from '@error/error.module';
import { FeatureService } from './feature.service';
import { FeatureController } from './feature.controller';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [FeatureController],
  providers: [FeatureService],
  exports: [],
})
export class FeatureModule {}
