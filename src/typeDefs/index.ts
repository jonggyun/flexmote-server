import { gql } from 'apollo-server-express';

const typedDefs = gql`
  type Flexible {
    company_id: String
    is_flexible: Boolean
    rule: String
  }

  type Remote {
    company_id: String
    is_remote: Boolean
    rule: String
  }

  type Company {
    company_id: String
    company_name: String
    description: String
    homepage: String
    location: String
    logo: String
    flexible: [Flexible]
    remote: [Remote]
  }

  type Query {
    hello: String
    companies: [Company]!
    company(company_id: String): Company
  }
  type Mutation {
    addCompany(
      company_name: String
      description: String
      homepage: String
      location: String
    ): Company
    updateCompany(
      company_id: String
      company_name: String
      description: String
      homepage: String
      location: String
    ): Company
    updateFlexible(
      company_id: String
      is_flexible: Boolean
      rule: String
    ): Flexible
    updateRemote(company_id: String, is_remote: Boolean, rule: String): Remote
  }
`;

export default typedDefs;
