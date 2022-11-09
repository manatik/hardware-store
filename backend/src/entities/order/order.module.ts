import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ErrorModule } from '@error/error.module';
import { PrismaModule } from '@prisma-service/prisma.module';

@Module({
  imports: [ErrorModule, PrismaModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
})
export class OrderModule {}
