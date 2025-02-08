import dbPostgres from 'data/db-postgres';

export const getServicesAndSalons = async () => {
  try {
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
