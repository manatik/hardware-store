import { Module } from '@nestjs/common';
import { PlywoodFormatsController } from 'entities/plywood-formats/plywood-formats.controller';
import { PlywoodFormatsService } from 'entities/plywood-formats/plywood-formats.service';

@Module({
  imports: [],
  controllers: [PlywoodFormatsController],
  providers: [PlywoodFormatsService],
})
export class PlywoodFormatsModule {}
