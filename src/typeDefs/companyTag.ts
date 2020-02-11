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
    getTags(company_id: String): CompanyTag
  }

  type Mutation {
    addTag(company_id: String): CompanyTag
  }
`;

export default typeDefs;
