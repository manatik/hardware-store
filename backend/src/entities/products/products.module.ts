import { Module } from "@nestjs/common";
import { FurnitureModule } from "./furniture/furniture.module";
import { HouseModule } from "./house/house.module";
import { PlywoodModule } from "./plywood/plywood.module";

@Module({
  imports: [FurnitureModule, HouseModule, PlywoodModule],
  controllers: [],
  providers: [],
  exports: [FurnitureModule, HouseModule, PlywoodModule]
})
export class ProductsModule {}