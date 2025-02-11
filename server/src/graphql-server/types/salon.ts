import { objectType, queryField } from 'nexus';

const salons = objectType({
  name: 'salons',
  definition: (t) => {
    t.int('id');
    t.string('name');
    t.string('location');
  },
});

export default salons;

export const salonQuery = queryField('salonQuery', {
  type: salons,
  args: {
    id: 'Int',
  },
  resolve: (_, args, context) =>
    context.prisma.salons.findFirstOrThrow({
      where: {
        id: args.id,
      },
    }),
});
