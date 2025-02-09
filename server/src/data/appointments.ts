import appointmentsPostgres from 'postgres/appointments';

const USE_PRISMA = process.env.USE_PRISMA === 'true';

export const getAppointmentsServicesAndSalons = async (id?: string): Promise<Appointment[]> => {
  try {
    if (USE_PRISMA) {
      const prismaClient = await import('../prisma').then((result) => result.default);
      const appointmentsPrisma = await import('../prisma/appointments').then(
        (result) => result.default
      );

      return await appointmentsPrisma(prismaClient).getAppointmentsServicesAndSalons(id);
    }

    // eslint-disable-next-line no-console
    console.log('**** The server is using Postgres `pg` package ****');
    return await appointmentsPostgres.getAppointmentsServicesAndSalons(id);
  } catch (error) {
    throw new Error(`**** Could not get appointments, services and salons: ${error}`);
  }
};

export const createAppointment = async (appointment: Omit<AppointmentSQL, 'id' | 'isDeleted'>) => {
  try {
    if (USE_PRISMA) {
      const prismaClient = await import('../prisma').then((result) => result.default);
      const appointmentsPrisma = await import('../prisma/appointments').then(
        (result) => result.default
      );
      return await appointmentsPrisma(prismaClient).createAppointment(appointment);
    }

    // eslint-disable-next-line no-console
    console.log('**** The server is using Postgres `pg` package ****');
    return await appointmentsPostgres.createAppointment(appointment);
  } catch (error) {
    throw new Error(`**** Could not create appointment for ${appointment.customerName}: ${error}`);
  }
};

export const updateAppointment = async (appointment: Omit<AppointmentSQL, 'isDeleted'>) => {
  try {
    if (USE_PRISMA) {
      const prismaClient = await import('../prisma').then((result) => result.default);
      const appointmentsPrisma = await import('../prisma/appointments').then(
        (result) => result.default
      );
      return await appointmentsPrisma(prismaClient).updateAppointment(appointment);
    }

    // eslint-disable-next-line no-console
    console.log('**** The server is using Postgres `pg` package ****');
    return await appointmentsPostgres.updateAppointment(appointment);
  } catch (error) {
    throw new Error(`**** Could not update appointment ${appointment.id}: ${error}`);
  }
};

export const softDeleteAppointment = async (id: number) => {
  try {
    if (USE_PRISMA) {
      const prismaClient = await import('../prisma').then((result) => result.default);
      const appointmentsPrisma = await import('../prisma/appointments').then(
        (result) => result.default
      );
      return await appointmentsPrisma(prismaClient).softDeleteAppointment(id);
    }

    // eslint-disable-next-line no-console
    console.log('**** The server is using Postgres `pg` package ****');
    return await appointmentsPostgres.softDeleteAppointment(id);
  } catch (error) {
    throw new Error(`**** Could not soft delete appointment ${id}: ${error}`);
  }
};

// id, salonId, customerName, serviceName, appointmentTime

const appointments = [
  {
    id: 1,
    service_id: 1,
    customerName: 'Xavier',
    appointmentTime: 200,
  },
  {
    id: 2,
    service_id: 2,
    customerName: 'Mabel',
    appointmentTime: 200,
  },
];

export default appointments;
