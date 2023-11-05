import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { TokenService } from './jwt.service';
import { UserValidationService } from 'src/validation/user/user-validation.service';

@Resolver()
export class TokenResolver {
  constructor(
    private tokenService: TokenService,
    private userValidationService: UserValidationService,
  ) {}

  @Mutation(() => String)
  async loginUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
    const user = await this.userValidationService.verifyUserCredentials(
      email,
      password,
    );
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const jwtToken = this.tokenService.generateToken(user.id);
    return jwtToken;
  }
}
