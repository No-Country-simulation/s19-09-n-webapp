import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../types/jwt-payload.type';

export const GetUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    const userData = request.user as JwtPayload;
    if (data && data in userData) {
      return userData[data];
    }
    return { id: userData.id, email: userData.email };
  },
);
