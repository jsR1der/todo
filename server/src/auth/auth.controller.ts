import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './auth.dto';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.name, signInDto.pass);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  logIn(@Body() signInDto: SignInDto) {
    return this.authService.logIn(signInDto.name, signInDto.pass);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  public profile(@Req() request: Request) {
    return request['user'];
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  public async logout(@Req() request: Request) {
    return await this.authService.logout(request);
  }
}
