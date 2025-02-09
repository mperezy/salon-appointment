import dbPostgres from 'postgres/db-postgres';

type ServicesPostgres = {
  getServicesAndSalons: () => Promise<Service[]>;
};

const servicesPostgres: ServicesPostgres = {
  getServicesAndSalons: async () => {
    const queryResult = await dbPostgres.query<Service>(
      `SELECT service.id,
              service.name,
              service.price,
              JSON_AGG(
                      JSON_BUILD_OBJECT(
                              'id', salon.id,
                              'name', salon.name,
                              'location', salon.location
                      )
              ) AS salons
       FROM salon_appointment_db.services AS service
                JOIN salon_appointment_db.salons AS salon ON service.salon_id = salon.id
       GROUP BY service.id
       ORDER BY service.id ASC;
      `
    );

    return queryResult.rows.map(({ price, ...service }) => ({ ...service, price: Number(price) }));
  },
};

export default servicesPostgres;
