import { IsInt, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  nameUZ: string;

  @IsString()
  nameOZ: string;

  @IsString()
  nameRU: string;

  @IsString()
  descriptionUZ: string;

  @IsString()
  descriptionOZ: string;

  @IsString()
  descriptionRU: string;

  @IsInt()
  categoryID: number;
}
