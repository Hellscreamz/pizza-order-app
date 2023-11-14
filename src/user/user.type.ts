import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { OrderType } from 'src/order/orders.type';

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  address: string;

  @Field()
  email: string;

  @Field()
  mobile_phone: string;

  @Field(() => [OrderType], { nullable: true })
  orders?: OrderType[];
}

@InputType()
export class CreateUserInput {
  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  address: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  mobile_phone: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  first_name: string;

  @Field({ nullable: true })
  last_name: string;

  @Field({ nullable: true })
  address: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  mobile_phone: string;
}

@InputType()
export class FindUserByEmailInput {
  @Field()
  email: string;
}

@InputType()
export class DeleteUserByEmailInput {
  @Field()
  email: string;
}
