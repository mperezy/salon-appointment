import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const graphqlPath = path.join(__dirname, '/src/graphql-server/generated');
const graphqlDistPath = path.join(__dirname, 'dist/graphql-server/generated');
const prismaPath = path.join(__dirname, '/src/prisma-orm/generated');
const prismaDistPath = path.join(__dirname, '/dist/prisma-orm/generated');

const dirExists = (path) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve) => {
    try {
      await fs.readdir(path);

      resolve(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      resolve(false);
    }
  });

(async () => {
  try {
    const isDistExists = await dirExists(path.join(__dirname, '/dist'));

    if (!isDistExists) {
      await fs.mkdir(graphqlDistPath);
      await fs.mkdir(prismaDistPath);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw new Error('**** Dist folder does not exists.');
  }

  await fs.cp(graphqlPath, graphqlDistPath, { recursive: true }, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error({ error });
      throw new Error('**** Error during copy GraphQL generated files.');
    }
  });

  await fs.cp(prismaPath, prismaDistPath, { recursive: true }, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error({ error });
      throw new Error('**** Error during copy Prisma generated files.');
    }
  });
})();
