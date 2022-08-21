import { Module } from "@nestjs/common";
import { FurnitureController } from "./furniture.controller";
import { FurnitureService } from "./furniture.service";
import { PrismaModule } from "../../../database/prisma/prisma.module";
import { ErrorModule } from "../../../common/error/error.module";
import { FilesModule } from "../../../common/files/files.module";

@Module({
  imports: [PrismaModule, ErrorModule, FilesModule],
  controllers: [FurnitureController],
  providers: [FurnitureService],
  exports: []
})
export class FurnitureModule {}