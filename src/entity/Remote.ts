import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Remote {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('uuid')
  companyId!: string;

  @Column('boolean')
  is_remote!: boolean;

  @Column('text')
  rule!: string;
}
