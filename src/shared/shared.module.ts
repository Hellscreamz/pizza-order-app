import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { join } from 'path';

import { OrderModule } from 'src/order/orders.module';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';
import { DatabaseModule } from 'src/database/database.module';
import { UserValidationModule } from 'src/validation/user/user-validation.module';
import { AuthInterceptor } from 'src/interceptor/auth-interceptor';
import { JWTModule } from 'src/token/jwt.module';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    DatabaseModule,
    OrderModule,
    UserModule,
    ProductModule,
    UserValidationModule,
    JWTModule,
    ConfigModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
})
export class SharedModule {}
