import { gql } from 'apollo-server-express';

const typedDefs = gql`
  type Flexible {
    companyId: String
    isFlexible: Boolean
    ruls: String
  }

  type Remote {
    companyId: String
    isRemote: Boolean
    rule: String
  }

  type Company {
    companyId: String
    company: String
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
    company: Company
  }
  type Mutation {
    addJob(company: String, description: String): Company
  }
`;

export default typedDefs;
