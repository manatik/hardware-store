import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'entities/user/user.module';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { AuthorizationModule } from 'authorization/authorization.module';
import { PrismaModule } from 'database/prisma/prisma.module';
import { JwtAuthGuard } from 'authorization/guards/jwt.guard';
import { RolesGuard } from 'authorization/guards/roles.guard';
import { ProductsModule } from 'entities/products/products.module';
import { CategoryModule } from 'entities/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({}),
    UserModule,
    AuthorizationModule,
    PrismaModule,
    ProductsModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
