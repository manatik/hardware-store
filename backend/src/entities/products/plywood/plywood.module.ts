import { Module } from "@nestjs/common";
import { PlywoodController } from "./plywood.controller";
import { PlywoodService } from "./plywood.service";

@Module({
  imports: [],
  controllers: [PlywoodController],
  providers: [PlywoodService],
  exports: []
})
export class PlywoodModule {}