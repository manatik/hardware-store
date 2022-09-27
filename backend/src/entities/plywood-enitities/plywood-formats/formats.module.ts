import { Module } from '@nestjs/common';
import { FormatsController } from 'entities/plywood-enitity/plywood-formats/formats.controller';
import { FormatsService } from 'entities/plywood-enitity/plywood-formats/formats.service';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ErrorModule } from 'common/error/error.module';

@Module({
  imports: [PrismaModule, ErrorModule],
  controllers: [FormatsController],
  providers: [FormatsService],
})
export class FormatsModule {}
