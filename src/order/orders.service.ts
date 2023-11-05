import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Orders } from './orders.entity';
import { Users } from 'src/user/user.entity';
import { Products } from 'src/product/product.entity';
import {
  CreateOrderInput,
  OrderType,
  AllOrdersType,
  OrderDeleteType,
  DeleteOrderInput,
} from './orders.type';
import {
  NotEnoughProductAmountException,
  SizeProductOverException,
  AmountProductException,
} from 'src/validation/custom-exceptions/product-amount';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
  ) {}

  async getAllOrders(): Promise<AllOrdersType[]> {
    return this.ordersRepository.find();
  }

  async createOrder(input: CreateOrderInput): Promise<OrderType> {
    const user = await this.userRepository.findOneOrFail({
      where: { email: input.email },
    });

    const product = await this.productRepository.findOneOrFail({
      where: { name: input.product_name },
    });

    if (product.amount <= 0) {
      throw new NotEnoughProductAmountException();
    }

    if (input.size !== product.size) {
      throw new SizeProductOverException();
    }

    if (input.amount > product.amount) {
      throw new AmountProductException();
    }

    try {
      const totalPrice = product.price * input.amount;

      const newOrder = this.ordersRepository.create({
        user,
        product_name: input.product_name,
        size: input.size,
        price: totalPrice,
        amount: input.amount,
      });

      // Decrement the product amount in products relation
      product.amount -= input.amount;

      await this.productRepository.save(product);

      return this.ordersRepository.save(newOrder);
    } catch (error) {
      throw new Error(`Failed to create the order! Error: ${error.message}`);
    }
  }

  async deleteOrderById(input: DeleteOrderInput): Promise<OrderDeleteType> {
    const order = await this.ordersRepository.findOneOrFail({
      where: { id: input.order_id },
    });

    if (order.delivery) {
      throw new NotFoundException(
        'Order cannot be deleted because is already delivered!',
      );
    }

    try {
      const product = await this.productRepository.findOneOrFail({
        where: { name: order.product_name },
      });

      // Increment the product amount in products relation
      product.amount += order.amount;

      await this.productRepository.save(product);

      await this.ordersRepository.remove(order);

      return order;
    } catch (error) {
      throw new Error(`Failed to delete the order! Error: ${error.message}`);
    }
  }
}
