import dbPostgres from 'postgres/db-postgres';

type AppointmentsPostgres = {
  getAppointmentsServicesAndSalons: (id?: string) => Promise<Appointment[]>;
  createAppointment: (
    appointment: Omit<AppointmentSQL, 'id' | 'isDeleted'>
  ) => Promise<AppointmentSQL>;
  updateAppointment: (appointment: Omit<AppointmentSQL, 'isDeleted'>) => Promise<AppointmentSQL>;
  softDeleteAppointment: (id: number) => Promise<AppointmentSQL>;
};

const appointmentsPostgres: AppointmentsPostgres = {
  getAppointmentsServicesAndSalons: async (id) => {
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
  },

  createAppointment: async (appointment) => {
    const results = await dbPostgres.query<AppointmentSQL>(
      `INSERT INTO salon_appointment_db.appointments
       (service_id, "customerName", "appointmentTime", "isDeleted")
       VALUES (${appointment.service_id}, '${appointment.customerName}',
               ${appointment.appointmentTime}, false);`
    );

    return results.rows[0];
  },

  updateAppointment: async (appointment) => {
    const { id, customerName, appointmentTime, service_id } = appointment;
    const results = await dbPostgres.query<AppointmentSQL>(
      `UPDATE salon_appointment_db.appointments AS appointment
       SET "appointmentTime" = ${appointmentTime},
           "customerName"    = '${customerName}',
           service_id        = ${service_id}
       WHERE appointment.id = ${id};
      `
    );

    return results.rows[0];
  },

  softDeleteAppointment: async (id) => {
    const results = await dbPostgres.query<AppointmentSQL>(
      `UPDATE salon_appointment_db.appointments AS appointment
       SET "isDeleted" = TRUE
       WHERE appointment.id = ${id};
      `
    );

    return results.rows[0];
  },
};

export default appointmentsPostgres;
