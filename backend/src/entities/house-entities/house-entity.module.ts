import { Module } from '@nestjs/common';
import { HouseModule } from 'entities/house-entities/house/house.module';

@Module({
  imports: [HouseModule],
  exports: [HouseModule],
})
export class HouseEntityModule {}
