import { ObjectType, InputType, Field, ID, Int } from '@nestjs/graphql';
import ProductSize from 'src/enums/product-size.enum';

@ObjectType()
export class ProductType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  description: string;

  @Field(() => ProductSize)
  size: ProductSize;

  @Field(() => Int)
  amount: number;
}

@ObjectType()
export class DeletedProductType {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  description: string;

  @Field(() => ProductSize)
  size: ProductSize;

  @Field(() => Int)
  amount: number;
}

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  description: string;

  @Field(() => ProductSize)
  size: ProductSize;

  @Field()
  amount: number;
}

@InputType()
export class UpdateProductInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  description: string;

  @Field(() => ProductSize, { nullable: true })
  size: ProductSize;

  @Field({ nullable: true })
  amount: number;
}

@InputType()
export class DeleteProductInput {
  @Field()
  id: string;
}

@InputType()
export class FindProductByName {
  @Field()
  name: string;
}
