import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'entities/user/user.module';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { AuthorizationModule } from 'authorization/authorization.module';
import { PrismaModule } from 'database/prisma/prisma.module';
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./authorization/guards/jwt.guard";
import { RolesGuard } from "./authorization/guards/roles.guard";
import { JwtModule } from "@nestjs/jwt";
import { ProductsModule } from "./entities/products/products.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({}),
    UserModule,
    AuthorizationModule,
    PrismaModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
