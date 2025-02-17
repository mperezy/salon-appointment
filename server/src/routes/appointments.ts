import express, { type Request, type Response } from 'express';
import {
  getAppointmentsServicesAndSalons,
  createAppointment,
  updateAppointment,
  softDeleteAppointment,
} from 'data/appointments';
import delay from 'utils/delay';

const app = express();

app.get('/', async (req: Request, res: Response) => {
  const appointmentId = req.query['id'] as string | undefined;
  await delay();
  const appointments = await getAppointmentsServicesAndSalons(appointmentId);

  res.json(appointments);
});

app.post('/', async (req: Request, res: Response) => {
  const { body } = req;
  await delay();
  const newAppointment = await createAppointment(body);

  res.json(newAppointment);
});

app.patch('/', async (req: Request, res: Response) => {
  const { body } = req;
  await delay();
  const appointmentUpdated = await updateAppointment(body);

  res.json(appointmentUpdated);
});

app.delete('/', async (req: Request, res: Response) => {
  const appointmentId = req.query['id'] as string;
  await delay();
  await softDeleteAppointment(Number(appointmentId));

  res.sendStatus(204);
});

export default app;
