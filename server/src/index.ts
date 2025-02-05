import express from 'express';
import cors from 'cors';
import appointmentsRouter from 'routes/appointments';

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

// routes
app.use('/appointments', appointmentsRouter);

app.listen(4000, () => {
  console.log("I'm running the server at http://localhost:4000");
});
