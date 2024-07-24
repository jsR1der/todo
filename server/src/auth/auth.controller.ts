import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './auth.dto';
import { AuthGuard } from './auth.guard';
import { Request, Response } from 'express';
import { GlobalInterceptor } from '../global/global.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signUp')
  signIn(@Body() signInDto: SignUpDto) {
    return this.authService.signUp(signInDto.name, signInDto.pass);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  @UseInterceptors(GlobalInterceptor)
  public async logIn(@Body() signInDto: SignUpDto, @Res() res: Response) {
    const token = await this.authService.signIn(signInDto.name, signInDto.pass);
    return res.json(token);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  public profile(@Req() request: Request) {
    return request['user'];
  }

  @Get('signOut')
  public async logout(@Req() request: Request, @Res() res: Response) {
    const responseMessage = await this.authService.signOut(request);
    res.json(responseMessage);
  }
}
