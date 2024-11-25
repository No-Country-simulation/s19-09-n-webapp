import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuardBearer extends AuthGuard('jwt_bearer') {
  constructor() {
    super();
  }
}
