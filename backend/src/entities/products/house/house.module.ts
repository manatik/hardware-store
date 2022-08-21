import { Module } from "@nestjs/common";
import { HouseController } from "./house.controller";
import { HouseService } from "./house.service";
import { PrismaModule } from "../../../database/prisma/prisma.module";
import { ErrorModule } from "../../../common/error/error.module";

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [HouseController],
  providers: [HouseService],
  exports: []
})
export class HouseModule {}