import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Products } from './product.entity';
import {
  ProductType,
  CreateProductInput,
  UpdateProductInput,
  DeleteProductInput,
  FindProductByName,
  DeletedProductType,
} from './product.type';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
  ) {}

  async getAllProducts(): Promise<ProductType[]> {
    return this.productRepository.find();
  }

  async findProductByName(input: FindProductByName): Promise<ProductType> {
    try {
      return this.productRepository.findOneOrFail({
        where: { name: input.name },
      });
    } catch (error) {
      throw new NotFoundException(`Product not found! Error: ${error.message}`);
    }
  }

  async createProduct(input: CreateProductInput): Promise<ProductType> {
    const existingProduct = await this.productRepository.findOne({
      where: { name: input.name, size: input.size },
    });

    if (existingProduct) {
      throw new Error('Product with the same name and size already exists!');
    }

    try {
      const newProduct = this.productRepository.create(input);
      const savedProduct = await this.productRepository.save(newProduct);
      return savedProduct;
    } catch (error) {
      throw new Error(
        `Failed to create a new product! Error: ${error.message}`,
      );
    }
  }

  async updateProduct(input: UpdateProductInput): Promise<ProductType> {
    try {
      const existingProduct = await this.productRepository.findOneOrFail({
        where: { id: input.id },
      });
      const updatedProduct = await this.productRepository.save({
        ...existingProduct,
        ...input,
      });
      return updatedProduct;
    } catch (error) {
      throw new Error(`Failed to update the product! Error: ${error.message}`);
    }
  }

  async deleteProduct(input: DeleteProductInput): Promise<DeletedProductType> {
    try {
      const productToDelete = await this.productRepository.findOneOrFail({
        where: { id: input.id },
      });
      await this.productRepository.remove(productToDelete);
      return productToDelete;
    } catch (error) {
      throw new Error(`Failed to delete the product! Error: ${error.message}`);
    }
  }
}
