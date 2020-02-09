import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type News {
    title: String
    originallink: String
    link: String
    description: String
    pubDate: Date
  }

  type Query {
    getNews(query: String): [News]
  }

  scalar Date
`;

export default typeDefs;
