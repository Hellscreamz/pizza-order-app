import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ObjectType } from '@nestjs/graphql';

import { Users } from 'src/user/user.entity';
import ProductSize from 'src/enums/product-size.enum';

@Entity()
@ObjectType()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
    update: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  bought_at: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 50 })
  product_name: string;

  @Column({
    type: 'enum',
    enum: ProductSize,
  })
  size: ProductSize;

  @Column({ type: 'int' })
  amount: number;

  // We use this "delivery" column with randomly generated true or false value because our logic will have different behavior based on that,
  // In real world we will receive this status from lets say some 3rd party integration which orders are delivered or not delivered or may be pending
  // and based on that we will perform different operations or automated jobs

  @Column({ type: 'boolean', default: () => 'RANDOM() < 0.5' })
  delivery: boolean;

  @ManyToOne(() => Users, (user) => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
