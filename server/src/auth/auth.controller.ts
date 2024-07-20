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
import { UtilityService } from '../services/unility/utility.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly utilityService: UtilityService,
  ) {}

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

  @UseGuards(AuthGuard)
  @Get('signOut')
  public async logout(@Req() request: Request) {
    return await this.authService.signOut(request);
  }
}
