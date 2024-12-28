import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateShoppingCartItemDto } from './dto/create-shopping-cart-item.dto';
import { PrismaService } from '@app/prisma/prisma.service';
import { UpdateShoppingCartItemDto } from './dto/update-shopping-cart-item.dto';

@Injectable()
export class ShoppingCartItemsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userID: number, createShoppingCartItemDto: CreateShoppingCartItemDto) {
    return this.prisma.shoppingCartItem.create({
      data: {
        quantity: createShoppingCartItemDto.quantity,
        productVariation: {
          connect: {
            id: createShoppingCartItemDto.productVariationID,
          },
        },
        user: {
          connect: {
            id: userID,
          },
        },
      },
    });
  }

  findAll(userID: number) {
    return this.prisma.shoppingCartItem.findMany({
      where: {
        userID,
      },
    });
  }

  async findOne(userID: number, id: number) {
    const shoppingCartItem = await this.prisma.shoppingCartItem.findUnique({
      where: {
        id,
        userID,
      },
    });
    if (!shoppingCartItem) {
      throw new NotFoundException('ShoppingCartItem not found');
    }

    return shoppingCartItem;
  }

  async update(
    userID: number,
    id: number,
    updateShoppingCartItemDto: UpdateShoppingCartItemDto,
  ) {
    const shoppingCartItem = await this.prisma.shoppingCartItem.findUnique({
      where: {
        id,
        userID,
      },
    });
    if (!shoppingCartItem) {
      throw new NotFoundException('ShoppingCartItem not found');
    }

    return this.prisma.shoppingCartItem.update({
      where: {
        id,
        userID,
      },
      data: updateShoppingCartItemDto,
    });
  }

  async remove(userID: number, id: number) {
    const shoppingCartItem = await this.prisma.shoppingCartItem.findUnique({
      where: {
        id,
        userID,
      },
    });
    if (!shoppingCartItem) {
      throw new NotFoundException('ShoppingCartItem not found');
    }

    return this.prisma.shoppingCartItem.delete({
      where: {
        id,
        userID,
      },
    });
  }
}
