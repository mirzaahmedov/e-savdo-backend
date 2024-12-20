import { Prisma } from '@prisma/client';
import { AuthService, SignInInput } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() data: Prisma.UserCreateInput) {
    return this.authService.signUp(data);
  }

  @Post('sign-in')
  async signIn(@Body() data: SignInInput) {
    return this.authService.signIn(data);
  }
}
