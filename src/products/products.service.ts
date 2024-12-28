import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from '@app/prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        nameUZ: createProductDto.nameUZ,
        nameOZ: createProductDto.nameOZ,
        nameRU: createProductDto.nameRU,
        descriptionUZ: createProductDto.descriptionUZ,
        descriptionOZ: createProductDto.descriptionOZ,
        descriptionRU: createProductDto.descriptionRU,
        category: {
          connect: {
            id: createProductDto.categoryID,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        variations: true,
        images: true,
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
        nameUZ: updateProductDto.nameUZ,
        nameOZ: updateProductDto.nameOZ,
        nameRU: updateProductDto.nameRU,
        descriptionUZ: updateProductDto.descriptionUZ,
        descriptionOZ: updateProductDto.descriptionOZ,
        descriptionRU: updateProductDto.descriptionRU,
        category: {
          connect: updateProductDto.categoryID
            ? {
                id: updateProductDto.categoryID,
              }
            : undefined,
        },
      },
    });
  }

  async remove(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
