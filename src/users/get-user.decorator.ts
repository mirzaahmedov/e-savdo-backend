import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { UserPayload } from './interfaces/user-payload.interface';

export const GetUser = createParamDecorator<UserPayload>(
  (_: unknown, context: ExecutionContext) => {
    const user: UserPayload = new Reflector().get('user', context.getHandler());
    return user;
  },
);
