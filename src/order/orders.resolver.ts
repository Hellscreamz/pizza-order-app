import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsePipes } from '@nestjs/common';

import { OrderService } from './orders.service';
import {
  OrderType,
  AllOrdersType,
  CreateOrderInput,
  DeleteOrderInput,
  OrderDeleteType,
} from './orders.type';
import { ValidationPipe } from 'src/pipe/validation-pipe';

@Resolver(() => OrderType)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Query(() => [AllOrdersType])
  async getAllOrders(): Promise<AllOrdersType[]> {
    return this.orderService.getAllOrders();
  }

  @Mutation(() => OrderType)
  @UsePipes(new ValidationPipe())
  async createOrder(
    @Args('input') input: CreateOrderInput,
  ): Promise<OrderType> {
    return this.orderService.createOrder(input);
  }

  @Mutation(() => OrderDeleteType)
  @UsePipes(new ValidationPipe())
  async deleteOrderById(
    @Args('input') input: DeleteOrderInput,
  ): Promise<OrderDeleteType> {
    return this.orderService.deleteOrderById(input);
  }
}
