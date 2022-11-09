import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'entities/user/user.module';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { AuthorizationModule } from 'authorization/authorization.module';
import { JwtAuthGuard } from 'authorization/guards/jwt.guard';
import { RolesGuard } from 'authorization/guards/roles.guard';
import { CategoryModule } from 'entities/category/category.module';
import { PrismaModule } from 'database/prisma/prisma.module';
import { getJwtConfig } from 'common/config/jwt.config';
import { PlywoodEntityModule } from 'entities/plywood-entities/plywood-entity.module';
import { HouseEntityModule } from 'entities/house-entities/house-entity.module';
import { FurnitureEntityModule } from 'entities/furniture-entities/furniture-entity.module';
import { EmailModule } from './email/email.module';
import { OrderModule } from './entities/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    OrderModule,
    EmailModule,
    UserModule,
    PrismaModule,
    AuthorizationModule,
    CategoryModule,
    FurnitureEntityModule,
    HouseEntityModule,
    PlywoodEntityModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {}
