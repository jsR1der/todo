import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../routes/users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.authService.extractTokenFromHeader(request);
    if (this.authService.tokenBlackList.has(token)) {
      throw new UnauthorizedException();
    }
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('secret'),
      });
      request['user'] = payload;
    } catch (e) {
      const valid = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('secret'),
        ignoreExpiration: true,
      });
      if (valid) {
        const user = await this.userService.findOne('id', valid.sub);
        if (user?.refresh_token) {
          await this.authService.setupTokens(user);
          return true;
        }
      }
      throw new UnauthorizedException();
    }
    return true;
  }
}
