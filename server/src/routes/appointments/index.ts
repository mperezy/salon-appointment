import express, { type Request, type Response } from 'express';
import appointments from 'data/appointments';
import salons from 'data/salons';
import services from 'data/services';

const app = express();

const data = { DB_APPOINTMENTS: [...appointments] };

app.get('/', (req: Request, res: Response) => {
  const appointmentId = req.query['id'];

  const _appointments = data.DB_APPOINTMENTS.map(({ service_id, ...appointment }) => ({
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
    id: data.DB_APPOINTMENTS.length + 1,
    ...body,
  };

  data.DB_APPOINTMENTS.push(newAppointment);

  res.json(newAppointment);
});

app.patch('/', (req: Request, res: Response) => {
  const { body: appointmentUpdated } = req;

  data.DB_APPOINTMENTS = [...data.DB_APPOINTMENTS].map((appointment) => {
    if (appointment.id === appointmentUpdated.id) {
      return appointmentUpdated;
    }

    return appointment;
  });

  res.json(appointmentUpdated);
});

app.delete('/', (req: Request, res: Response) => {
  const appointmentId = req.query['id'];

  data.DB_APPOINTMENTS = [...data.DB_APPOINTMENTS].filter(({ id }) => id !== Number(appointmentId));

  res.sendStatus(204);
});

export default app;
