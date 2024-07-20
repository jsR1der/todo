import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../routes/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from '../routes/users/user.entity';
import { Request } from 'express';
import { SignUpInResponse } from './auth.dto';

@Injectable()
export class AuthService {
  public tokenBlackList: Set<string> = new Set();

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public async signUp(name: string, pass: string): Promise<SignUpInResponse> {
    const userExist = await this.userService.findOne('name', name);
    if (userExist) {
      throw new Error(`User with name ${name} already exist`);
    }
    const user = await this.userService.create({ name, pass });
    const token = await this.createToken(user.id, user.name);
    const { pass, ...userWithoutPass } = user;
    return { token, user: userWithoutPass };
  }

  public async signIn(name: string, pass: string): Promise<SignUpInResponse> {
    const user = await this.validateUser(name, pass);
    const token = await this.createToken(user.id, user.name);
    const { pass, ...userWithoutPass } = user;
    return { token, user: userWithoutPass };
  }

  public isTokenValid(token: string): boolean {
    if (this.tokenBlackList.has(token) || !token) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private async createToken(userId: number, name: string): Promise<string> {
    const payload = { sub: userId, name };
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('secret'),
      expiresIn: '30s',
    });
  }

  public async validateUser(name: string, pass: string): Promise<User> {
    const user = await this.userService.findOne('name', name);
    if (!user) {
      throw new Error(`User with name ${name} was not found.`);
    }
    const valid = await bcrypt.compare(pass, user.pass);
    if (!valid) {
      throw new HttpException('Wrong credentials, try again', 403);
    }
    return user;
  }

  public extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  public async signOut(req: Request): Promise<any> {
    const token = this.extractTokenFromHeader(req);
    const decoded = this.jwtService.decode(token);
    this.tokenBlackList.add(token);
    // await this.userService.update(decoded.sub, { refresh_token: null });
    return `User with id ${decoded.sub} was logged out`;
  }
}
