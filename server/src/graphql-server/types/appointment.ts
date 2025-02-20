import { list, mutationField, nonNull, nullable, objectType, queryField } from 'nexus';
import appointmentsPrisma from 'prisma-orm/appointments';
import { serviceAndSalons } from 'graphql-server/types/service';

const appointments = objectType({
  name: 'appointments',
  definition: (t) => {
    t.int('id');
    t.int('service_id');
    t.string('customerName');
    t.float('appointmentTime');
    t.boolean('isDeleted');
  },
});

export default appointments;

export const appointmentQuery = queryField('appointmentQuery', {
  type: appointments,
  args: {
    id: 'Int',
  },
  resolve: async (_, args, context) =>
    await context.prisma.appointments.findFirstOrThrow({
      where: {
        id: args.id,
      },
    }),
});

const appointmentServicesAndSalons = list(
  objectType({
    name: 'appointmentList',
    definition: (t) => {
      t.int('id');
      t.string('customerName');
      t.float('appointmentTime');
      t.list.field('services', {
        type: serviceAndSalons,
      });
    },
  })
);

export const appointmentQueryList = queryField('appointmentQueryList', {
  type: appointmentServicesAndSalons,
  args: {
    id: nullable('String'),
  },
  resolve: async (_, args, context) =>
    await appointmentsPrisma(context.prisma).getAppointmentsServicesAndSalons(args.id),
});

export const appointmentCreateMutation = mutationField('createAppointment', {
  type: appointments,
  args: {
    customerName: nonNull('String'),
    appointmentTime: nonNull('Float'),
    service_id: nonNull('Int'),
  },
  resolve: async (_, args, context) =>
    await appointmentsPrisma(context.prisma).createAppointment(args),
});

export const appointmentUpdateMutation = mutationField('updateAppointment', {
  type: appointments,
  args: {
    id: nonNull('Int'),
    customerName: nonNull('String'),
    appointmentTime: nonNull('Float'),
    service_id: nonNull('Int'),
  },
  resolve: async (_, args, context) =>
    await appointmentsPrisma(context.prisma).updateAppointment(args),
});

export const appointmentSoftDeleteMutation = mutationField('softDeleteAppointment', {
  type: appointments,
  args: {
    id: nonNull('Int'),
  },
  resolve: async (_, args, context) =>
    await appointmentsPrisma(context.prisma).softDeleteAppointment(args.id),
});

export const appointmentRecoverMutation = mutationField('recoverAppointment', {
  type: appointments,
  args: {
    id: nonNull('Int'),
  },
  resolve: async (_, args, context) =>
    await appointmentsPrisma(context.prisma).recoverAppointment(args.id),
});
