import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

import { UserType } from 'src/user/user.type';
import ProductSize from 'src/enums/product-size.enum';

@ObjectType()
export class OrderType {
  @Field(() => ID)
  id: string;

  @Field()
  product_name: string;

  @Field(() => ProductSize)
  size: ProductSize;

  @Field()
  bought_at: Date;

  @Field()
  price: number;

  @Field()
  amount: number;

  @Field()
  delivery: boolean;

  @Field(() => UserType)
  user: UserType;
}

@ObjectType()
export class AllOrdersType {
  @Field(() => ID)
  id: string;

  @Field()
  product_name: string;

  @Field(() => ProductSize)
  size: ProductSize;

  @Field()
  bought_at: Date;

  @Field()
  price: number;

  @Field()
  amount: number;

  @Field()
  delivery: boolean;
}

@ObjectType()
export class OrderDeleteType {
  @Field()
  product_name: string;

  @Field(() => ProductSize)
  size: ProductSize;

  @Field()
  amount: number;

  @Field()
  bought_at: Date;

  @Field()
  price: number;
}

@InputType()
export class CreateOrderInput {
  @Field()
  email: string;

  @Field()
  product_name: string;

  @Field(() => ProductSize)
  size: ProductSize;

  @Field(() => Int)
  amount: number;
}

@InputType()
export class DeleteOrderInput {
  @Field()
  order_id: string;
}
