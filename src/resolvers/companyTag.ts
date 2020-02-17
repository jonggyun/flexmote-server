import { getRepository, getConnection } from 'typeorm';

import Tag from '../entity/Tag';
import CompanyTag from '../entity/CompanyTag';

const addTag = ({
  company_id,
  tags,
}: {
  company_id: string;
  tags: string[];
}) => {
  const connection = getConnection();
  const companyTags = tags.reduce((pv: Tag[], cv: string) => {
    const tag = new Tag();
    tag.tag_name = cv;
    return [...pv, tag];
  }, []);

  const tagPromise = companyTags.map(
    tag =>
      new Promise<Tag>((resolve, reject) => {
        connection.manager
          .save(tag)
          .then(() => resolve())
          .catch(() => reject());
      }),
  );

  Promise.all(tagPromise)
    .then(async () => {
      const companyTag = new CompanyTag();
      companyTag.company_id = company_id;
      companyTag.tags = companyTags;
      await connection.manager.save(companyTag);
    })
    .catch(err => {
      throw err;
    });
};

export default {
  Query: {
    getCompanyTags: async (_: any, args: { company_id: string }) =>
      await getRepository(CompanyTag).find({
        where: { company_id: args.company_id },
      }),
  },
  Mutation: {
    addCompanyTag: async (
      _: any,
      args: { company_id: string; tags: string[] },
    ) => {
      const company_id = args.company_id;
      const tags = args.tags;
      await addTag({ company_id, tags });
    },
    updateCompanyTag: async (
      _: any,
      args: { company_id: string; tags: string[] },
    ) => {
      const company_id = args.company_id;
      const tags = args.tags;

      const oldTags = await getConnection()
        .createQueryBuilder()
        .relation(CompanyTag, 'tags')
        .of(company_id)
        .loadMany();

      await getConnection()
        .createQueryBuilder()
        .relation(CompanyTag, 'tags')
        .of(company_id)
        .remove(oldTags);

      await addTag({ company_id, tags });
    },
  },
};
