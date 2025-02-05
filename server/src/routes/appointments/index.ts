import express, { type Request, type Response } from 'express';
import appointments from 'routes/appointments/data/appointments';
import salons from 'routes/appointments/data/salons';
import services from 'routes/appointments/data/services';

const app = express();

app.get('/', (req: Request, res: Response) => {
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

app.post('/', (req: Request, res: Response) => {
  const { body } = req;
  console.log({ body });

  res.json({ body });
});

app.patch('/', (req: Request, res: Response) => {
  const { body } = req;
  console.log({ body });

  res.json({ body });
});

app.delete('/', (req: Request, res: Response) => {
  const { body } = req;
  console.log({ body });

  res.send(204);
});

export default app;
