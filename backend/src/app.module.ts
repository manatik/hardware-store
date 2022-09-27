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
import { FurnitureModule } from 'entities/furniture/furniture.module';
import { HouseModule } from 'entities/house/house.module';
import { PlywoodModule } from 'entities/plywood/plywood.module';
import { PlywoodFormatsModule } from 'entities/plywood-formats/plywood-formats.module';
import { PrismaModule } from 'database/prisma/prisma.module';
import { getJwtConfig } from 'common/config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    UserModule,
    PrismaModule,
    AuthorizationModule,
    CategoryModule,
    FurnitureModule,
    HouseModule,
    PlywoodModule,
    PlywoodFormatsModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {}
