import type { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import appointments from './data/appointments.ts';
import salons from './data/salons.ts';
import services from './data/services.ts';

const app = express();

app.use(
  cors({
    origin: '*',
  })
);

app.get('/appointments', (req: Request, res: Response) => {
  const _appointments = appointments.map(({ service_id, ...appointment }) => ({
    ...appointment,
    services: services
      .filter(({ id }) => id === service_id)
      .map(({ salon_id, ...service }) => ({
        ...service,
        salons: salons.filter(({ id }) => id === salon_id),
      })),
  }));

  res.json(_appointments);
});

app.listen(4000, () => {
  console.log("I'm running the server at http://localhost:4000");
});
