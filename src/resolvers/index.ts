import company from './company';

const resolvers = {
  Query: {
    ...company.Query,
  },
  Mutation: {
    ...company.Mutation,
  },
};

export default resolvers;
