import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Flexible from './Flexible';
import Remote from './Remote';

@Entity()
export default class Company {
  @PrimaryGeneratedColumn('uuid')
  company_id!: string;

  @Column({
    length: 50,
  })
  company_name!: string;

  @Column('text')
  description!: string;

  @Column({
    length: 50,
  })
  homepage!: string;

  @Column()
  location!: string;

  @OneToOne(type => Flexible)
  @JoinColumn()
  flexible!: Flexible;

  @OneToOne(type => Remote)
  @JoinColumn()
  remote!: Remote;
}
