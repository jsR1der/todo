import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class UtilityService {
  public setCookie(key: string, value: string, res: Response): void {
    res.cookie(key, value, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
      secure: true,
    });
  }
}
