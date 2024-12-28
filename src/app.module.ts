import { CategoriesModule } from './categories/categories.module';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from './prisma/prisma.module';
import { ProductAttributesModule } from './product-attributes/product-attributes.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { ProductVariationsModule } from './product-variations/product-variations.module';
import { ProductsModule } from './products/products.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ShoppingCartItemsModule } from './shopping-cart-items/shopping-cart-items.module';
import { UsersModule } from './users/users.module';
import { join } from 'path';

MulterModule.register({
  dest: './uploads',
});

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
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: join(__dirname, '..', './uploads'),
    }),
  ],
})
export class AppModule {}
