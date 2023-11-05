import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from 'src/user/user.entity';
import { UserValidationService } from './user-validation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UserValidationService],
  exports: [UserValidationService],
})
export class UserValidationModule {}
