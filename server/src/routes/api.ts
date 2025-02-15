import cors from 'cors';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import graphqlServer from 'graphql-server';
import context from 'graphql-server/context';
import appointmentsRouter from 'routes/appointments';
import servicesRouter from 'routes/services';

const app = express();

await graphqlServer.start();

export const cleanUpGraphqlServer = async () => {
  await graphqlServer.stop();
};

app.use('/appointments', appointmentsRouter);
app.use('/services', servicesRouter);

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(graphqlServer, {
    context,
  })
);

export default app;
