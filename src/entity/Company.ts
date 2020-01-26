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
  companyId!: string;

  @Column({
    length: 50,
  })
  company!: string;

  @Column('text')
  description!: string;

  @Column({
    length: 50,
  })
  homepage!: string;

  @Column()
  location!: string;

  @Column()
  logo!: string;

  @OneToOne(type => Flexible)
  @JoinColumn()
  flexible!: Flexible;

  @OneToOne(type => Remote)
  @JoinColumn()
  remote!: Remote;
}
