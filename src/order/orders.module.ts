import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Orders } from './orders.entity';
import { Users } from 'src/user/user.entity';
import { Products } from 'src/product/product.entity';
import { OrderService } from './orders.service';
import { OrderResolver } from './orders.resolver';
import { UserValidationModule } from 'src/validation/user/user-validation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, Users, Products]),
    UserValidationModule,
  ],
  providers: [OrderService, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}
