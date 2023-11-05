import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginUserInputType {
  @Field()
  email: string;

  @Field()
  password: string;
}
