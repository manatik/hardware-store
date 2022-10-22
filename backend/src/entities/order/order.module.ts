import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ErrorModule } from '../../common/error/error.module';
import { PrismaModule } from '../../database/prisma/prisma.module';

@Module({
  imports: [ErrorModule, PrismaModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
})
export class OrderModule {}
