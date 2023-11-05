import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TokenService } from './jwt.service';
import { TokenResolver } from './jwt.resolver';
import { UserValidationModule } from 'src/validation/user/user-validation.module';

@Module({
  imports: [UserValidationModule],
  providers: [TokenService, TokenResolver, ConfigService],
  exports: [TokenService],
})
export class JWTModule {}
