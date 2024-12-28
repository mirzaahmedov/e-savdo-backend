import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user-dto';
import { PrismaService } from '@app/prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { UserPayload } from './interfaces/user-payload.interface';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const hashedPassword = await hash(registerUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        firstName: registerUserDto.firstName,
        lastName: registerUserDto.lastName,
        phone: registerUserDto.phone,
        password: hashedPassword,
      },
    });

    delete user.password;

    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<{
    user: User;
    accessToken: string;
  }> {
    const user = await this.prisma.user.findUnique({
      where: {
        phone: loginUserDto.phone,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!(await compare(loginUserDto.password, user.password))) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload: UserPayload = {
      userID: user.id,
    };
    const accessToken = sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    delete user.password;

    return {
      user,
      accessToken,
    };
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
