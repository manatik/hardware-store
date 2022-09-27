import { Module } from '@nestjs/common';
import { AuthorizationController } from 'authorization/authorization.controller';
import { AuthorizationService } from 'authorization/authorization.service';
import { PrismaModule } from 'database/prisma/prisma.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from 'entities/user/user.module';
import { ErrorModule } from 'common/error/error.module';
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from 'entities/role/role.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, UserModule, ErrorModule, JwtModule, RoleModule, ConfigModule],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, JwtStrategy],
  exports: [],
})
export class AuthorizationModule {}
