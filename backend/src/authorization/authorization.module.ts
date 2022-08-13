import { Module } from '@nestjs/common';
import { AuthorizationController } from 'authorization/authorization.controller';
import { AuthorizationService } from 'authorization/authorization.service';
import { PrismaModule } from 'database/prisma/prisma.module';
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UserModule } from "../entities/user/user.module";
import { ErrorModule } from "../common/error/error.module";

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ErrorModule
  ],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, JwtStrategy],
  exports: [],
})
export class AuthorizationModule {}