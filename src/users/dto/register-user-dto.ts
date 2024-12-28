import {
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @Matches(/^998[0-9]{9}$/)
  phone: string;

  @IsString()
  @MinLength(8)
  @IsStrongPassword()
  password: string;
}
