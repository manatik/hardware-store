import { Module } from '@nestjs/common';
import { PlywoodController } from './plywood.controller';
import { PlywoodService } from './plywood.service';
import { PrismaModule } from '@prisma-service/prisma.module';
import { ErrorModule } from '@error/error.module';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [PlywoodController],
  providers: [PlywoodService],
  exports: [],
})
export class PlywoodModule {}
