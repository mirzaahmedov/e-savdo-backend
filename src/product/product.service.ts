import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(data: Prisma.ProductCreateInput) {
    return this.prisma.product.create({
      data,
    });
  }
  async getProducts() {
    return this.prisma.product.findMany({
      take: 10,
    });
  }
}
