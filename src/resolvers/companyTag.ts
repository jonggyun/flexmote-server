import { getRepository, getConnection } from 'typeorm';

import Tag from '../entity/Tag';
import CompanyTag from '../entity/CompanyTag';

export default {
  Query: {
    getTags: async () =>
      await getRepository(CompanyTag).find({
        where: { company_id: '8da897b6-3c1d-4b9a-86a6-350f02d85498' },
      }),
  },
  Mutation: {
    addTag: async (_: any, args: { company_id: string; tags: string[] }) => {
      const connection = getConnection();
      const company_id = args.company_id;
      const tags = args.tags;

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
    },
  },
};
