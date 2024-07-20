import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../routes/users/user.entity';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  @IsNotEmpty()
  pass: string;
}

export class SignUpInResponse {
  token: string;
  user: Omit<User, 'pass'>;
}
