import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import 'dotenv/config';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

createConnection({
  type: process.env.TYPEORM_TYPE as any,
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT || '', 10),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [__dirname + '/entity/index.ts'],
  synchronize: true,
  logging: false,
})
  .then(async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    const app = express();

    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
      ),
    );
  })
  .catch(error => console.log(error));
