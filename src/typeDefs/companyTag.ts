import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Tag {
    tag_id: String
    tag_name: String
  }

  type CompanyTag {
    company_id: String
    tags: [Tag]
  }

  type Query {
    getCompanyTags(company_id: String): CompanyTag
  }

  type Mutation {
    addCompanyTag(company_id: String, tags: [String]): CompanyTag
    updateCompanyTag(company_id: String, tags: [String]): CompanyTag
  }
`;

export default typeDefs;
