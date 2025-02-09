import type { PrismaClient } from 'prisma/generated';

type AppointmentsPrisma = {
  getAppointmentsServicesAndSalons: (id?: string) => Promise<Appointment[]>;
  createAppointment: (appointment: Omit<AppointmentSQL, 'id' | 'isDeleted'>) => Promise<void>;
  updateAppointment: (appointment: Omit<AppointmentSQL, 'isDeleted'>) => Promise<void>;
  softDeleteAppointment: (id: number) => Promise<void>;
};

export default (prisma: PrismaClient): AppointmentsPrisma => {
  // eslint-disable-next-line no-console
  console.log('**** The server is using Prisma ORM ****');

  return {
    getAppointmentsServicesAndSalons: async (id) => {
      const prismaResults = await prisma.appointments.findMany({
        where: id
          ? { isDeleted: false, id: Number(id) }
          : {
              isDeleted: false,
            },
        select: {
          id: true,
          customerName: true,
          appointmentTime: true,
          isDeleted: true,
          services: {
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
          },
        },
        orderBy: {
          id: 'asc',
        },
      });

      return prismaResults.map<Appointment>(({ services, ...appointment }) => ({
        ...appointment,
        appointmentTime: Number(appointment.appointmentTime),
        services: ((Array.isArray(services) ? services : [services]) as Service[]).map<Service>(
          ({ salons, ...service }) => ({
            ...service,
            price: Number(service.price),
            salons: Array.isArray(salons) ? salons : [salons],
          })
        ),
      }));
    },

    createAppointment: async (appointment) => {
      await prisma.appointments.create({
        data: {
          customerName: appointment.customerName,
          appointmentTime: appointment.appointmentTime,
          isDeleted: false,
          service_id: appointment.service_id,
        },
      });

      return;
    },

    updateAppointment: async (appointment) => {
      await prisma.appointments.update({
        data: {
          customerName: appointment.customerName,
          appointmentTime: appointment.appointmentTime,
          service_id: appointment.service_id,
        },
        where: {
          id: appointment.id,
        },
      });
    },

    softDeleteAppointment: async (id) => {
      await prisma.appointments.update({
        data: {
          isDeleted: true,
        },
        where: {
          id,
        },
      });
    },
  };
};
