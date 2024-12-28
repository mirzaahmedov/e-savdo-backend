import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user-dto';
import { PrismaService } from '@app/prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { UserPayload } from './interfaces/user-payload.interface';
import { hash } from 'bcrypt';
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
