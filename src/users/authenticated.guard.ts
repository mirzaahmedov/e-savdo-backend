import { CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';

import { Request } from 'express';
import { UserPayload } from './interfaces/user-payload.interface';
import { verify } from 'jsonwebtoken';

export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    try {
      const accessToken = request.cookies['access_token'];
      const payload = verify(
        accessToken,
        process.env.JWT_SECRET,
      ) as UserPayload;

      SetMetadata('user', payload)(context.getHandler());

      return true;
    } catch (error) {
      return false;
    }
  }
}
