import { Module } from '@nestjs/common';
import { ErrorModule } from '@error/error.module';
import { PrismaModule } from '@prisma-service/prisma.module';
import { ParametersController } from './parameters.controller';
import { ParametersService } from './parameters.service';

@Module({
  imports: [ErrorModule, PrismaModule],
  controllers: [ParametersController],
  providers: [ParametersService],
})
export class ParametersModule {}
