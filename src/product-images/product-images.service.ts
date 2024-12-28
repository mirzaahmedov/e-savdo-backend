import { CreateProductImageDto } from './dto/create-product-image.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { UpdateProductImageDto } from './dto/update-product-image.dto';

@Injectable()
export class ProductImagesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductImageDto: CreateProductImageDto) {
    return this.prisma.productImage.create({
      data: createProductImageDto,
    });
  }

  findAll() {
    return `This action returns all productImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productImage`;
  }

  update(id: number, updateProductImageDto: UpdateProductImageDto) {
    console.log(updateProductImageDto);
    return `This action updates a #${id} productImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} productImage`;
  }
}
