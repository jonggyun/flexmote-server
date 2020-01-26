import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class JobPost {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('uuid')
  companyId!: string;

  @Column()
  title!: string;

  @Column()
  url!: string;
}
