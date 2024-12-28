import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { Response } from 'express';
import { AuthenticatedGuard } from './authenticated.guard';
import { GetUser } from './get-user.decorator';
import { UserPayload } from './interfaces/user-payload.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(201)
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.register(registerUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const { user, accessToken } = await this.usersService.login(loginUserDto);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    res.send(user);
  }

  @Get('me')
  @UseGuards(AuthenticatedGuard)
  async findMe(@GetUser() currentUser: UserPayload) {
    const user = await this.usersService.findOne(currentUser.userID);
    delete user.password;
    return user;
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.send('Logged out');
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
