import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  nameUZ: string;

  @IsString()
  nameOZ: string;

  @IsString()
  nameRU: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsInt()
  @IsOptional()
  parentID?: number;
}
