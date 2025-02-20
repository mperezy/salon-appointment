import type { PrismaClient } from 'prisma-orm/generated';
import prisma from 'prisma-orm';

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
