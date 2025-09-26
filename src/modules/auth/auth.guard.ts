import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  setCredentialToRequest,
  TCredential,
} from '@src/modules/auth/auth.util';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configs: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) throw new UnauthorizedException('Invalid Token');

    try {
      const decoded: TCredential = this.jwtService.verify(token, {
        secret: this.configs.get<string>('JWT_ACCESS_SECRETKEY'),
      });

      setCredentialToRequest(request, decoded);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
