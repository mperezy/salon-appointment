import dbPostgres from 'postgres/db-postgres';

type AppointmentsPostgres = {
  getAppointmentsServicesAndSalons: (id?: string) => Promise<Appointment[]>;
  createAppointment: (appointment: Omit<AppointmentSQL, 'id' | 'isDeleted'>) => Promise<void>;
  updateAppointment: (appointment: Omit<AppointmentSQL, 'isDeleted'>) => Promise<void>;
  softDeleteAppointment: (id: number) => Promise<void>;
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
    await dbPostgres.query(
      `INSERT INTO salon_appointment_db.appointments
       (service_id, "customerName", "appointmentTime", "isDeleted")
       VALUES (${appointment.service_id}, '${appointment.customerName}',
               ${appointment.appointmentTime}, false);`
    );

    return;
  },

  updateAppointment: async (appointment) => {
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
  },

  softDeleteAppointment: async (id) => {
    await dbPostgres.query(
      `UPDATE salon_appointment_db.appointments AS appointment
       SET "isDeleted" = TRUE
       WHERE appointment.id = ${id};
      `
    );

    return;
  },
};

export default appointmentsPostgres;
