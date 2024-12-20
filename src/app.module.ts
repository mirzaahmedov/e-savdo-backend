import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    PrismaModule,
    JwtModule.register({ global: true }),
  ],
})
export class AppModule {}
