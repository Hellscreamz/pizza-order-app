import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsePipes } from '@nestjs/common';

import { ValidationPipe } from 'src/pipe/validation-pipe';
import { UserService } from './user.service';
import {
  UserType,
  UpdateUserInput,
  FindUserByEmailInput,
  DeleteUserByEmailInput,
  CreateUserInput,
} from './user.type';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserType])
  async getAllUsers(): Promise<UserType[]> {
    return this.userService.getAllUsers();
  }

  @Query(() => UserType)
  @UsePipes(new ValidationPipe())
  async findUserByEmail(
    @Args('input') input: FindUserByEmailInput,
  ): Promise<UserType> {
    return this.userService.findUserByEmail(input);
  }

  @Mutation(() => UserType)
  @UsePipes(new ValidationPipe())
  async createUser(@Args('input') input: CreateUserInput): Promise<UserType> {
    return this.userService.createUser(input);
  }

  @Mutation(() => UserType)
  @UsePipes(new ValidationPipe())
  async updateUser(@Args('input') input: UpdateUserInput): Promise<UserType> {
    return this.userService.updateUser(input);
  }

  @Mutation(() => UserType)
  @UsePipes(new ValidationPipe())
  async deleteUser(
    @Args('input') input: DeleteUserByEmailInput,
  ): Promise<UserType> {
    const deletedUser = await this.userService.deleteUser(input);
    return deletedUser;
  }
}
