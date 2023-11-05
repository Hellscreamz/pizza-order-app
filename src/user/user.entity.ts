import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType } from '@nestjs/graphql';

import { Orders } from 'src/order/orders.entity';

@Entity()
@ObjectType()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  first_name: string;

  @Column({ type: 'varchar', length: 20 })
  last_name: string;

  @Column({ type: 'varchar', length: 100 })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  mobile_phone: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    update: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  registered_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @OneToMany(() => Orders, (order) => order.user, { eager: true })
  orders: Orders[];
}
