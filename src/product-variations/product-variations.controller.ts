import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductVariationsService } from './product-variations.service';
import { CreateProductVariationDto } from './dto/create-product-variation.dto';
import { UpdateProductVariationDto } from './dto/update-product-variation.dto';
import { AuthenticatedGuard } from '@app/users/authenticated.guard';

@Controller('products/:productID/variations')
@UseGuards(AuthenticatedGuard)
export class ProductVariationsController {
  constructor(
    private readonly productVariationsService: ProductVariationsService,
  ) {}

  @Post()
  create(
    @Param('productID') productID: string,
    @Body() createProductVariationDto: CreateProductVariationDto,
  ) {
    return this.productVariationsService.create(
      +productID,
      createProductVariationDto,
    );
  }

  @Get()
  findAll(@Param('productID') productID: string) {
    return this.productVariationsService.findAll(+productID);
  }

  @Get(':id')
  findOne(@Param('productID') productID: string, @Param('id') id: string) {
    return this.productVariationsService.findOne(+productID, +id);
  }

  @Patch(':id')
  update(
    @Param('productID') productID: string,
    @Param('id') id: string,
    @Body() updateProductVariationDto: UpdateProductVariationDto,
  ) {
    return this.productVariationsService.update(
      +productID,
      +id,
      updateProductVariationDto,
    );
  }

  @Delete(':id')
  remove(@Param('productID') productID: string, @Param('id') id: string) {
    return this.productVariationsService.remove(+productID, +id);
  }
}
