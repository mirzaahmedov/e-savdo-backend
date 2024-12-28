import { IsString, Matches, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @Matches(/^998[0-9]{9}$/)
  phone: string;

  @IsString()
  @MinLength(8)
  password: string;
}
