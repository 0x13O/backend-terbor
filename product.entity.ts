import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 150,
    unique: true,
  })
  name: string;

  @Column({
    name: 'purchase_price',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  purchasePrice: number;

  @Column({
    name: 'sale_price',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  salePrice: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  quantity: number;

  @Column({
    name: 'min_quantity',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  minQuantity: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}