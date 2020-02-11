import { Entity, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';

import Tag from './Tag';

@Entity()
export default class CompanyTag {
  @PrimaryColumn('uuid')
  company_id!: string;

  @ManyToMany(
    type => Tag,
    tag => tag.companyTags,
  )
  @JoinTable()
  tags!: Tag[];
}
