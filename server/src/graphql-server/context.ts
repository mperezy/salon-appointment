import type { PrismaClient } from 'prisma/generated';
import prisma from 'prisma';

export type Context = {
  prisma: PrismaClient;
};

export default async (): Promise<Context> => {
  // eslint-disable-next-line no-console
  console.log('**** GraphQL API - Prisma Context triggered.');

  return {
    prisma,
  };
};
