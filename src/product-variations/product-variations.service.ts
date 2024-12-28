import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateProductVariationDto } from './dto/create-product-variation.dto';
import { PrismaService } from '@app/prisma/prisma.service';
import { UpdateProductVariationDto } from './dto/update-product-variation.dto';

@Injectable()
export class ProductVariationsService {
  constructor(private readonly prisma: PrismaService) {}

  create(
    productID: number,
    createProductVariationDto: CreateProductVariationDto,
  ) {
    const attributes = (createProductVariationDto.attributes || []).map(
      (attribute) => ({
        type: attribute.type,
        nameUZ: attribute.nameUZ,
        nameOZ: attribute.nameOZ,
        nameRU: attribute.nameRU,
        value: attribute.value,
      }),
    );

    return this.prisma.productVariation.create({
      data: {
        price: createProductVariationDto.price,
        stock: createProductVariationDto.stock,
        discount: createProductVariationDto.discount,
        product: {
          connect: {
            id: productID,
          },
        },
        attributes: {
          create: attributes,
        },
      },
    });
  }

  async findAll(productID: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productID,
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.productVariation.findMany({
      where: {
        productID,
      },
    });
  }

  async findOne(productID: number, id: number) {
    const productVariation = await this.prisma.productVariation.findUnique({
      where: {
        id,
        productID,
      },
      include: {
        attributes: true,
        images: true,
      },
    });
    if (!productVariation) {
      throw new NotFoundException('Product variation not found');
    }

    return productVariation;
  }

  async update(
    productID: number,
    id: number,
    updateProductVariationDto: UpdateProductVariationDto,
  ) {
    const productVariation = await this.prisma.productVariation.findUnique({
      where: {
        id,
        productID,
      },
    });
    if (!productVariation) {
      throw new NotFoundException('Product variation not found');
    }

    return this.prisma.productVariation.update({
      where: {
        id,
      },
      data: {
        price: updateProductVariationDto.price,
        stock: updateProductVariationDto.stock,
        discount: updateProductVariationDto.discount,
      },
    });
  }

  async remove(productID: number, id: number) {
    const productVariation = await this.prisma.productVariation.findUnique({
      where: {
        id,
      },
    });
    if (!productVariation) {
      throw new NotFoundException('Product variation not found');
    }

    return this.prisma.productVariation.delete({
      where: {
        id,
        productID,
      },
    });
  }
}
