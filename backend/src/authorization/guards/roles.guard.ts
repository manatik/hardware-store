import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../enum/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requireRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!requireRoles) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers?.authorization;
      const token = authHeader?.split(' ')[1];
      const tokenInfo = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });

      return tokenInfo.roles.some(({ role }) =>
        requireRoles.includes(role?.name),
      );
    } catch (e) {
      throw new HttpException(
        {
          message: 'Ошибка роли',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
