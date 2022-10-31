import { Module } from '@nestjs/common';
import { ErrorModule } from 'common/error/error.module';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ParametersController } from './parameters.controller';
import { ParametersService } from './parameters.service';

@Module({
  imports: [ErrorModule, PrismaModule],
  controllers: [ParametersController],
  providers: [ParametersService],
})
export class ParametersModule {}
