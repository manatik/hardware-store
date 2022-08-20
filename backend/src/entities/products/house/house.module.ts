import { Module } from "@nestjs/common";
import { HouseController } from "./house.controller";
import { HouseService } from "./house.service";

@Module({
  imports: [],
  controllers: [HouseController],
  providers: [HouseService],
  exports: []
})
export class HouseModule {}