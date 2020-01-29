import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Remote {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('uuid')
  company_id!: string;

  @Column('boolean')
  is_remote!: boolean;

  @Column('text')
  rule!: string;
}
