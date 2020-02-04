import { getRepository } from 'typeorm';
import uuid from 'uuid/v1';

import Company from '../entity/Company';
import Flexible from '../entity/Flexible';
import Remote from '../entity/Remote';

import { CompanyProps, FlexibleProps, RemoteProps } from 'types';

export default {
  Query: {
    hello: () => 'Hello World!!!!',
    companies: async () => await getRepository(Company).find(),
    company: async (_: any, { company_id }: { company_id: string }) => {
      return await getRepository(Company).findOne({ company_id });
    },
  },
  Mutation: {
    addCompany: async (_: any, args: CompanyProps) => {
      const company_id = uuid();

      const remote = new Remote();
      remote.company_id = company_id;
      remote.is_remote = args.is_remote;
      remote.rule = args.remote_rule;

      const flexible = new Flexible();
      flexible.company_id = company_id;
      flexible.is_flexible = args.is_flexible;
      flexible.rule = args.flexible_rule;

      const company = new Company();
      company.company_id = company_id;
      company.company_name = args.company_name;
      company.description = args.description;
      company.homepage = args.homepage;
      company.location = args.location;
      company.flexible = flexible;
      company.remote = remote;

      await getRepository(Remote).insert(remote);
      await getRepository(Flexible).insert(flexible);
      await getRepository(Company).insert(company);
    },
    updateCompany: async (_: any, args: CompanyProps) => {
      const company_id = args.company_id;
      const company = new Company();

      company.company_name = args.company_name;
      company.description = args.description;
      company.homepage = args.homepage;
      company.location = args.location;

      await getRepository(Company).update({ company_id }, company);
    },
    updateFlexible: async (_: any, args: FlexibleProps) => {
      const company_id = args.company_id;

      const flexible = new Flexible();
      flexible.is_flexible = args.is_flexible;
      flexible.rule = args.rule;

      await getRepository(Flexible).update({ company_id }, flexible);
    },
    updateRemote: async (_: any, args: RemoteProps) => {
      const company_id = args.company_id;

      const remote = new Remote();
      remote.is_remote = args.is_remote;
      remote.rule = args.rule;

      await getRepository(Remote).update({ company_id }, remote);
    },
  },
};
