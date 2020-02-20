import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class Comment {
  @PrimaryGeneratedColumn('uuid')
  comment_id!: string;

  @Column('uuid')
  company_id!: string;

  @Column('uuid')
  user_id!: string;

  @Column()
  username!: string;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  rating!: number;

  @Column('timestamp')
  @CreateDateColumn()
  created_at!: Date;

  @Column('timestamp')
  @UpdateDateColumn()
  updated_at!: Date;
}
