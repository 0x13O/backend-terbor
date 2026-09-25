import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('shifts')
export class Shift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'start_at', type: 'timestamp' })
  startAt: Date;

  @Column({ name: 'end_at', type: 'timestamp', nullable: true })
  endAt: Date | null;

  @Column({
    name: 'opening_balance',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  openingBalance: number;

  @Column({
    name: 'closing_balance',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  closingBalance: number | null;

  @Column({
    type: 'varchar',
    length: 20,
    default: 'open',
  })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}