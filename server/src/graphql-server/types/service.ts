import { list, objectType, queryField } from 'nexus';
import servicesPrisma from 'prisma/services';
import Salon from 'graphql-server/types/salon';

const services = objectType({
  name: 'services',
  definition: (t) => {
    t.int('id');
    t.int('salon_id');
    t.string('name');
    t.float('price');
  },
});

export default services;

export const serviceQuery = queryField('serviceQuery', {
  type: services,
  args: {
    id: 'Int',
  },
  resolve: async (_, args, context) =>
    context.prisma.services.findFirstOrThrow({
      where: {
        id: args.id,
      },
    }),
});

export const serviceAndSalons = objectType({
  name: 'serviceAndSalons',
  definition: (t) => {
    t.int('id');
    t.string('name');
    t.float('price');
    t.list.field('salons', {
      type: Salon,
    });
  },
});

export const serviceAndSalonsQueryList = queryField('serviceAndSalonsQueryList', {
  type: list(serviceAndSalons),
  resolve: async (_, __, context) => await servicesPrisma(context.prisma).getServicesAndSalons(),
});
