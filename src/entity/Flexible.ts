import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Flexible {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('uuid')
  companyId!: string;

  @Column('boolean')
  is_flexible!: boolean;

  @Column('text')
  rule!: string;
}
