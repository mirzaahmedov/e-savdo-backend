import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from '@app/prisma/prisma.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        nameUZ: createCategoryDto.nameUZ,
        nameOZ: createCategoryDto.nameOZ,
        nameRU: createCategoryDto.nameRU,
        icon: createCategoryDto.icon,
        parent: {
          connect: createCategoryDto.parentID
            ? {
                id: createCategoryDto.parentID,
              }
            : undefined,
        },
      },
    });
  }

  findAll() {
    return this.prisma.category.findMany({
      where: {
        parentID: null,
      },
      include: {
        children: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.prisma.category.update({
      where: {
        id,
      },
      data: {
        nameUZ: updateCategoryDto.nameUZ,
        nameOZ: updateCategoryDto.nameOZ,
        nameRU: updateCategoryDto.nameRU,
        icon: updateCategoryDto.icon,
        parent: {
          connect: updateCategoryDto.parentID
            ? {
                id: updateCategoryDto.parentID,
              }
            : undefined,
        },
      },
    });
  }

  async remove(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
