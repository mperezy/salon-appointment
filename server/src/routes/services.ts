import express, { type Request, type Response } from 'express';
import { getServicesAndSalons } from 'data/services';
import delay from 'utils/delay';

const app = express();

app.get('/', async (req: Request, res: Response) => {
  const services = await getServicesAndSalons();
  await delay();

  res.json(services);
});

export default app;
