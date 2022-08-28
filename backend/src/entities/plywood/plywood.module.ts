import { Module } from '@nestjs/common';
import { PlywoodController } from 'entities/plywood/plywood.controller';
import { PlywoodService } from 'entities/plywood/plywood.service';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ErrorModule } from 'common/error/error.module';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [PlywoodController],
  providers: [PlywoodService],
  exports: [],
})
export class PlywoodModule {}
