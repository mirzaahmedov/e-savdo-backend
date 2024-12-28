import { IsInt, Min } from 'class-validator';

export class CreateShoppingCartItemDto {
  @IsInt()
  @Min(1)
  quantity: number;

  @IsInt()
  productVariationID: number;
}
