import { Body, Controller, Get, Post } from '@nestjs/common';

import { ProductService } from './product.service';
import { Prisma } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts() {
    return this.productService.getProducts();
  }

  @Post()
  async createProduct(@Body() data: Prisma.ProductCreateInput) {
    return this.productService.createProduct(data);
  }
}
