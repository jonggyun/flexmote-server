import { getRepository } from 'typeorm';
import Company from '../entity/Company';
import Flexible from '../entity/Flexible';
import Remote from '../entity/Remote';

const resolvers = {
  Query: {
    hello: () => 'Hello World!!!!',
    companies: async () => await getRepository(Company).find(),
    company: async ({ companyId }: { companyId: string }) =>
      await getRepository(Company).findOne({ company_id: companyId }),
  },
  Mutation: {
    addJob: async (obj: any, args: any, context: any, info: any) => {
      const remote = new Remote();
      remote.company_id = '1c3b7a30-8106-439a-aab7-a2f1f4b70707';
      remote.is_remote = true;
      remote.rule = 'asdasd';

      const flexible = new Flexible();
      flexible.company_id = '1c3b7a30-8106-439a-aab7-a2f1f4b70707';
      flexible.is_flexible = true;
      flexible.rule = 'qweqeweq';

      const company = new Company();
      company.company_id = '1c3b7a30-8106-439a-aab7-a2f1f4b70707';
      company.company = 'company name';
      company.description = 'description!!!';
      company.homepage = 'https://naver.com';
      company.location = '서울시 강서구';
      company.logo = 'asdasdasd.png';
      company.flexible = flexible;
      company.remote = remote;

      await getRepository(Remote).save(remote);
      await getRepository(Flexible).save(flexible);
      await getRepository(Company).save(company);
    },
  },
};

export default resolvers;
