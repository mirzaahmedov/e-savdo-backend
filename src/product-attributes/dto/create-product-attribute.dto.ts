import { IsEnum, IsString } from 'class-validator';

import { ProductAttributeType } from '@prisma/client';

export class CreateProductAttributeDto {
  @IsEnum(ProductAttributeType)
  type: ProductAttributeType;

  @IsString()
  nameUZ: string;

  @IsString()
  nameOZ: string;

  @IsString()
  nameRU: string;

  @IsString()
  value: string;
}
