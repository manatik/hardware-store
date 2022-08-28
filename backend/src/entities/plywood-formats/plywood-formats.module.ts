import { Module } from '@nestjs/common';
import { PlywoodFormatsController } from 'entities/plywood-formats/plywood-formats.controller';
import { PlywoodFormatsService } from 'entities/plywood-formats/plywood-formats.service';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ErrorModule } from 'common/error/error.module';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [PlywoodFormatsController],
  providers: [PlywoodFormatsService],
})
export class PlywoodFormatsModule {}
