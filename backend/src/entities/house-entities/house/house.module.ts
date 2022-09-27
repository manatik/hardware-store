import { Module } from '@nestjs/common';
import { HouseController } from 'entities/house-entities/house/house.controller';
import { HouseService } from 'entities/house-entities/house/house.service';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ErrorModule } from 'common/error/error.module';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [HouseController],
  providers: [HouseService],
  exports: [],
})
export class HouseModule {}
