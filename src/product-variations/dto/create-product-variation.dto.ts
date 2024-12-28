import { IsArray, IsInt, IsNumber, IsOptional } from 'class-validator';

import { CreateProductAttributeDto } from '@app/product-attributes/dto/create-product-attribute.dto';

export class CreateProductVariationDto {
  @IsNumber()
  price: number;

  @IsNumber()
  @IsOptional()
  discount?: number;

  @IsInt()
  stock: number;

  @IsArray()
  @IsOptional()
  attributes: CreateProductAttributeDto[];
}
