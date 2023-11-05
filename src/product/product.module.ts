import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Products } from './product.entity';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
