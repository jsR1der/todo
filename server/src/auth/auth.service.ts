import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../routes/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from '../routes/users/user.entity';
import { Request } from 'express';

@Injectable()
export class AuthService {
  public tokenBlackList: Set<string> = new Set();

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public async signIn(name: string, pass: string): Promise<any> {
    const userExist = await this.userService.findOne('name', name);
    if (userExist) {
      throw new Error(`User with name ${name} already exist`);
    }
    const user = await this.userService.create({ name, pass });

    const accessToken = await this.createToken(user.id, user.name);
    const refreshToken = await this.createToken(user.id, user.name);
    await this.storeRefreshToken(refreshToken, user);
    return accessToken;
  }

  public async logIn(name: string, pass: string): Promise<any> {
    const user = await this.validateUser(name, pass);
    return await this.setupTokens(user);
  }

  private async createToken(userId: number, name: string): Promise<string> {
    const payload = { sub: userId, name };
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('secret'),
      expiresIn: '30s',
    });
  }

  public async setupTokens(user: User): Promise<any> {
    const accessToken = await this.createToken(user.id, user.name);
    const refreshToken = await this.createToken(user.id, user.name);

    await this.storeRefreshToken(refreshToken, user);
    return accessToken;
  }

  private async storeRefreshToken(token: string, user: User): Promise<any> {
    await this.userService.update(user.id, { ...user, refresh_token: token });
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

  public async logout(req: Request): Promise<any> {
    const token = this.extractTokenFromHeader(req);
    const decoded = this.jwtService.decode(token);
    this.tokenBlackList.add(token);
    await this.userService.update(decoded.sub, { refresh_token: null });
    return `User with id ${decoded.sub} was logged out`;
  }
}
