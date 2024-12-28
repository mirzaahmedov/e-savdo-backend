import { IsInt, IsString, IsUrl } from 'class-validator';

export class CreateProductImageDto {
  @IsString()
  @IsUrl()
  url: string;

  @IsInt()
  productID: number;

  @IsInt()
  variationID: number;
}
