import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductVariationsService } from './product-variations.service';
import { CreateProductVariationDto } from './dto/create-product-variation.dto';
import { UpdateProductVariationDto } from './dto/update-product-variation.dto';

@Controller('product-variations')
export class ProductVariationsController {
  constructor(
    private readonly productVariationsService: ProductVariationsService,
  ) {}

  @Post()
  create(@Body() createProductVariationDto: CreateProductVariationDto) {
    return this.productVariationsService.create(createProductVariationDto);
  }

  @Get()
  findAll() {
    return this.productVariationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productVariationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductVariationDto: UpdateProductVariationDto,
  ) {
    return this.productVariationsService.update(+id, updateProductVariationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productVariationsService.remove(+id);
  }
}
