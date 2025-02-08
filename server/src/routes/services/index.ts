import express, { type Request, type Response } from 'express';
import { getServicesAndSalons } from 'data/services';

const app = express();

app.get('/', async (req: Request, res: Response) => {
  const services = await getServicesAndSalons();

  res.json(services);
});

export default app;
