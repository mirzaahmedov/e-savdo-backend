import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { UserService } from '@app/user/user.service';

const jwtSecret = 'secret';

export type SignInInput = {
  phone: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  async signUp(data: Prisma.UserCreateInput) {
    const user = await this.userService.createUser(data);
    const token = await this.jwtService.signAsync(
      {
        id: user.id,
      },
      {
        secret: jwtSecret,
      },
    );

    return {
      user,
      token,
    };
  }

  @HttpCode(HttpStatus.OK)
  async signIn(data: SignInInput) {
    const user = await this.userService.findUserByPhone(data.phone);

    if (!user) {
      return null;
    }

    const token = await this.jwtService.signAsync(
      { id: user.id },
      {
        secret: jwtSecret,
      },
    );

    return {
      user,
      token,
    };
  }
}
