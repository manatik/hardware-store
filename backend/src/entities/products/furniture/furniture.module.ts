import { Module } from "@nestjs/common";
import { FurnitureController } from "./furniture.controller";
import { FurnitureService } from "./furniture.service";

@Module({
  imports: [],
  controllers: [FurnitureController],
  providers: [FurnitureService],
  exports: []
})
export class FurnitureModule {}