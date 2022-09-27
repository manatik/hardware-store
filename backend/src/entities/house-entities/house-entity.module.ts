import { Module } from '@nestjs/common';
import { HouseModule } from 'entities/house-entity/house/house.module';

@Module({
  imports: [HouseModule],
  exports: [HouseModule],
})
export class HouseEntityModule {}
