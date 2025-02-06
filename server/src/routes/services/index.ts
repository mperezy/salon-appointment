import express, { type Request, type Response } from 'express';
import salons from 'data/salons';
import services from 'data/services';

const app = express();

app.get('/', (req: Request, res: Response) => {
  const _services = services.map(({ salon_id, ...service }) => ({
    ...service,
    salons: salons.filter(({ id }) => salon_id === id),
  }));

  res.json(_services);
});

export default app;
