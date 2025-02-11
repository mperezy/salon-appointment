import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { expressMiddleware } from '@apollo/server/express4';
import graphqlServer from 'graphql-server';
import context from 'graphql-server/context';
import appointmentsRouter from 'routes/appointments';
import servicesRouter from 'routes/services';

const app = express();

await graphqlServer.start();

const cleanUpServer = async () => {
  await graphqlServer.stop();
};

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// routes
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

// Do not exit error on any exception
// Reference: https://stackoverflow.com/questions/4213351/make-node-js-not-exit-on-error
process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.log('Caught exception: ', err);
});

const server = app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log("I'm running the server at http://localhost:4000");
});

const shutdown = async () => {
  // eslint-disable-next-line no-console
  console.log('Closing server...');
  await cleanUpServer();

  server.close(() => {
    // eslint-disable-next-line no-console
    console.log('Server closed.');
    process.exit(0);
  });
};

// Handle system signals
process.on('exit', shutdown);
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
