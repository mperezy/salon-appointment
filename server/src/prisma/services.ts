import type { PrismaClient } from 'prisma/generated';

type ServicesPrisma = {
  getServicesAndSalons: () => Promise<Service[]>;
};

export default (prismaClient: PrismaClient): ServicesPrisma => {
  // eslint-disable-next-line no-console
  console.log('**** The server is using Prisma ORM ****');

  return {
    getServicesAndSalons: async () => {
      const prismaResults = await prismaClient.services.findMany({
        select: {
          id: true,
          name: true,
          price: true,
          salons: {
            select: {
              id: true,
              name: true,
              location: true,
            },
          },
        },
        orderBy: {
          id: 'asc',
        },
      });

      return prismaResults.map<Service>(({ salons, ...service }) => ({
        ...service,
        price: Number(service.price),
        salons: (Array.isArray(salons) ? salons : [salons]) as Salon[],
      }));
    },
  };
};
