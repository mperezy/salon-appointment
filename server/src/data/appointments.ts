import dbPostgres from 'data/db-postgres';

export const getAppointmentsServicesAndSalons = async (id?: string): Promise<Appointment[]> => {
  try {
    const whereClause = id ? `AND appointment.id = ${id}` : '';

    const queryResult = await dbPostgres.query<Appointment>(
      `SELECT appointment.id,
              appointment."customerName",
              appointment."appointmentTime",
              appointment."isDeleted",
              JSON_AGG(
                      JSON_BUILD_OBJECT(
                              'id', service.id,
                              'name', service.name,
                              'price', service.price,
                              'salons', JSON_BUILD_ARRAY(
                                      JSON_BUILD_OBJECT(
                                              'id', salon.id,
                                              'name', salon.name,
                                              'location', salon.location
                                      )
                                        )
                      )
              ) AS services
       FROM salon_appointment_db.appointments AS appointment
                JOIN salon_appointment_db.services AS service ON appointment.service_id = service.id
                JOIN salon_appointment_db.salons AS salon ON service.salon_id = salon.id
       WHERE appointment."isDeleted" = FALSE ${whereClause}
       GROUP BY appointment.id, appointment."customerName", appointment."appointmentTime"
       ORDER BY appointment.id ASC;
      `
    );

    return queryResult.rows;
  } catch (error) {
    throw new Error(`**** Could not get appointments, services and salons: ${error}`);
  }
};

export const createAppointment = async (appointment: Omit<AppointmentSQL, 'id' | 'isDeleted'>) => {
  try {
    await dbPostgres.query(
      `INSERT INTO salon_appointment_db.appointments
       (service_id, "customerName", "appointmentTime", "isDeleted")
       VALUES (${appointment.service_id}, '${appointment.customerName}',
               ${appointment.appointmentTime}, false);`
    );

    return;
  } catch (error) {
    throw new Error(`**** Could not create appointment for ${appointment.customerName}: ${error}`);
  }
};

export const updateAppointment = async (appointment: Omit<AppointmentSQL, 'isDeleted'>) => {
  try {
    const { id, customerName, appointmentTime, service_id } = appointment;
    await dbPostgres.query(
      `UPDATE salon_appointment_db.appointments AS appointment
       SET "appointmentTime" = ${appointmentTime},
           "customerName"    = '${customerName}',
           service_id        = ${service_id}
       WHERE appointment.id = ${id};
      `
    );

    return;
  } catch (error) {
    throw new Error(`**** Could not update appointment ${appointment.id}: ${error}`);
  }
};

export const softDeleteAppointment = async (id: string) => {
  try {
    await dbPostgres.query(
      `UPDATE salon_appointment_db.appointments AS appointment
       SET "isDeleted" = TRUE
       WHERE appointment.id = ${id};
      `
    );

    return;
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
