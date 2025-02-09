import express, { type Request, type Response } from 'express';
import {
  getAppointmentsServicesAndSalons,
  createAppointment,
  updateAppointment,
  softDeleteAppointment,
} from 'data/appointments';

const app = express();

app.get('/', async (req: Request, res: Response) => {
  const appointmentId = req.query['id'] as string | undefined;
  const appointments = await getAppointmentsServicesAndSalons(appointmentId);

  res.json(appointments);
});

app.post('/', async (req: Request, res: Response) => {
  const { body: newAppointment } = req;
  await createAppointment(newAppointment);

  res.json(newAppointment);
});

app.patch('/', async (req: Request, res: Response) => {
  const { body: appointmentUpdated } = req;
  await updateAppointment(appointmentUpdated);

  res.json(appointmentUpdated);
});

app.delete('/', async (req: Request, res: Response) => {
  const appointmentId = req.query['id'] as string;
  await softDeleteAppointment(Number(appointmentId));

  res.sendStatus(204);
});

export default app;
