import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType } from '@nestjs/graphql';

import ProductSize from 'src/enums/product-size.enum';

@Entity()
@ObjectType()
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: ProductSize })
  size: ProductSize;

  @Column({ type: 'int' })
  amount: number;

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
}
