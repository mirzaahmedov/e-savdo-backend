import { CategoriesModule } from './categories/categories.module';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ProductVariationsModule } from './product-variations/product-variations.module';
import { ProductAttributesModule } from './product-attributes/product-attributes.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { ShoppingCartItemsModule } from './shopping-cart-items/shopping-cart-items.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({ global: true }),
    UsersModule,
    CategoriesModule,
    ProductsModule,
    ProductVariationsModule,
    ProductAttributesModule,
    ProductImagesModule,
    ShoppingCartItemsModule,
    AuthModule,
  ],
})
export class AppModule {}
