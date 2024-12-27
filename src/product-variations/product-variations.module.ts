import { Module } from '@nestjs/common';
import { ProductVariationsService } from './product-variations.service';
import { ProductVariationsController } from './product-variations.controller';

@Module({
  controllers: [ProductVariationsController],
  providers: [ProductVariationsService],
})
export class ProductVariationsModule {}
