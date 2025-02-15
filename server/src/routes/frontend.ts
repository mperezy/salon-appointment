import express from 'express';
import path from 'path';
import dirname from 'utils/dirname';

const FRONTEND_URL = process.env.FRONTEND_URL ?? '';
const isViteAppProd = process.env.VITE_APP_MODE === 'PROD';
const app = express();

const frontendDistPath = path.join(dirname, '../../../app/dist');

if (isViteAppProd) {
  app.use('/', express.static(frontendDistPath));
  app.use('*', express.static(frontendDistPath));
} else {
  app.get('/', (_, res) => res.redirect(FRONTEND_URL));
  app.get('/*', ({ originalUrl }, res) => res.redirect(`${FRONTEND_URL}${originalUrl}`));
}

export default app;
