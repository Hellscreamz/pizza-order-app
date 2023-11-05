import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsePipes } from '@nestjs/common';

import { ValidationPipe } from 'src/pipe/validation-pipe';
import { ProductService } from './product.service';
import { Products } from './product.entity';
import {
  ProductType,
  CreateProductInput,
  UpdateProductInput,
  DeleteProductInput,
  FindProductByName,
  DeletedProductType,
} from './product.type';

@Resolver(() => Products)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [ProductType])
  async getAllProducts(): Promise<ProductType[]> {
    return this.productService.getAllProducts();
  }

  @Query(() => ProductType)
  @UsePipes(new ValidationPipe())
  async findProductByName(
    @Args('input') input: FindProductByName,
  ): Promise<ProductType> {
    return this.productService.findProductByName(input);
  }

  @Mutation(() => ProductType)
  @UsePipes(new ValidationPipe())
  async createProduct(
    @Args('input') input: CreateProductInput,
  ): Promise<ProductType> {
    return this.productService.createProduct(input);
  }

  @Mutation(() => DeletedProductType)
  @UsePipes(new ValidationPipe())
  async deleteProduct(
    @Args('input') input: DeleteProductInput,
  ): Promise<DeletedProductType> {
    return this.productService.deleteProduct(input);
  }

  @Mutation(() => ProductType)
  @UsePipes(new ValidationPipe())
  async updateProduct(
    @Args('input') input: UpdateProductInput,
  ): Promise<ProductType> {
    return this.productService.updateProduct(input);
  }
}
