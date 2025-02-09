import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import appointmentsRouter from 'routes/appointments';
import servicesRouter from 'routes/services';

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// routes
app.use('/appointments', appointmentsRouter);
app.use('/services', servicesRouter);

// Do not exit error on any exception
// Reference: https://stackoverflow.com/questions/4213351/make-node-js-not-exit-on-error
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
});

app.listen(4000, () => {
  console.log("I'm running the server at http://localhost:4000");
});
