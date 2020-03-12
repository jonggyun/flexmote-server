import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class User {
  @PrimaryColumn('uuid')
  user_id!: string;

  @Column({
    length: 255,
  })
  email!: string;

  @Column({
    length: 255,
    unique: true,
  })
  username!: string;

  @Column()
  social!: string;

  @Column('timestamp')
  @CreateDateColumn()
  created_at!: Date;

  @Column('timestamp')
  @UpdateDateColumn()
  updated_at!: Date;
}
