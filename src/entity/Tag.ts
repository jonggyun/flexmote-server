import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

import CompanyTag from './CompanyTag';

@Entity()
export default class Tag {
  @PrimaryGeneratedColumn('uuid')
  tag_id!: string;

  @Column()
  tag_name!: string;

  @ManyToMany(
    type => CompanyTag,
    companyTag => companyTag.tags,
    { cascade: true },
  )
  companyTags!: CompanyTag[];
}
