import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Comment {
    comment_id: String
    company_id: String
    user_id: String
    username: String
    title: String
    content: String
    rating: Int
    created_at: Date
    updated_at: Date
  }

  type Query {
    getCommentsByCompany(company_id: String): [Comment]
  }

  type Mutation {
    addComment(
      company_id: String
      user_id: String
      username: String
      title: String
      content: String
      rating: Int
    ): Comment
    removeComment(comment_id: String): Comment
  }

  scalar Date
`;

export default typeDefs;
