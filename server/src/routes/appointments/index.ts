import express, { type Request, type Response } from 'express';
import appointments from 'data/appointments';
import salons from 'data/salons';
import services from 'data/services';

const app = express();

const DB_APPOINTMENTS = [...appointments];

app.get('/', (req: Request, res: Response) => {
  const appointmentId = req.query['id'];

  const _appointments = DB_APPOINTMENTS.map(({ service_id, ...appointment }) => ({
    ...appointment,
    services: services
      .filter(({ id }) => id === service_id)
      .map(({ salon_id, ...service }) => ({
        ...service,
        salons: salons.filter(({ id }) => id === salon_id),
      })),
  }));

  if (!appointmentId) {
    res.json(_appointments);
    return;
  }

  res.json(_appointments.filter(({ id }) => id === Number(appointmentId)));
});

app.post('/', (req: Request, res: Response) => {
  const { body } = req;
  const newAppointment = {
    id: DB_APPOINTMENTS.length + 1,
    ...body,
  };

  DB_APPOINTMENTS.push(newAppointment);

  res.json(newAppointment);
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
