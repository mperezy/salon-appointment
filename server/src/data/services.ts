import servicesPostgres from 'postgres/services';

const USE_PRISMA = process.env.USE_PRISMA === 'true';

export const getServicesAndSalons = async (): Promise<Service[]> => {
  try {
    if (USE_PRISMA) {
      const prismaClient = await import('../prisma').then((result) => result.default);
      const servicesPrisma = await import('../prisma/services').then((result) => result.default);

      return await servicesPrisma(prismaClient).getServicesAndSalons();
    }

    // eslint-disable-next-line no-console
    console.log('**** The server is using Postgres `pg` package ****');
    return await servicesPostgres.getServicesAndSalons();
  } catch (error) {
    throw new Error(`**** Could not get services and salons: ${error}`);
  }
};

// id, salon_id, name, price.

const services = [
  {
    id: 1,
    salon_id: 2,
    name: 'Service 1',
    price: 150,
  },
  {
    id: 2,
    salon_id: 1,
    name: 'Service 2',
    price: 175,
  },
];

export default services;
