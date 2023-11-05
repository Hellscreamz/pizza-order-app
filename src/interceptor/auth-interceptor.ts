import * as jwt from 'jsonwebtoken';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { TokenService } from 'src/token/jwt.service';
import { CONFIG } from 'src/constants/constants';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const token = req.headers.authorization;

    if (
      ctx.getHandler().name === CONFIG.createUser ||
      ctx.getHandler().name === CONFIG.loginUser
    ) {
      return next.handle();
    }

    if (!token) {
      throw new UnauthorizedException('Missing authorization header!');
    }

    try {
      const secretKey = this.tokenService.getSecretKey();
      const verifiedToken = jwt.verify(token, secretKey);
      req.user = verifiedToken;
    } catch (error) {
      throw new UnauthorizedException(
        `Invalid token or expired! Error: ${error.message}`,
      );
    }

    return next.handle();
  }
}
