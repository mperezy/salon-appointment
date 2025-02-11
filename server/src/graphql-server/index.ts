import { ApolloServer } from '@apollo/server';
import schema from 'graphql-server/schema';
import type { Context } from 'graphql-server/context';

export default new ApolloServer<Context>({
  schema,
});
