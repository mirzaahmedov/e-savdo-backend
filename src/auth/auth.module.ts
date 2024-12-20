import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { UserService } from '@app/user/user.service';

@Module({
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {
  contructor() {}
}
