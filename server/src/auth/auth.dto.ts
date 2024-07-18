import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  @IsNotEmpty()
  pass: string;
}
