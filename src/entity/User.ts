import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  user_id!: string;

  @Column({
    length: 255,
    unique: true,
  })
  email!: string;

  @Column({
    length: 255,
    unique: true,
  })
  username!: string;

  @Column('timestamp')
  @CreateDateColumn()
  created_at!: Date;

  @Column('timestamp')
  @UpdateDateColumn()
  updated_at!: Date;
}
