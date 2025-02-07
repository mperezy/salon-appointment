/*
 How to run this script:
 - Go inside container 'salon_appointment-psql'
 - Once inside container run `psql -U admin -d salon_appointment`
 - Then, inside the psql CLI run `\i /db-scripts/db-salon.sql`
 - Finally, to see if all tables are created, go to PGAdmin, authenticate with
   admin@salon.com/admin1234, create server connection if not exists
   and check tables created under schema salon_appointment_db
*/

CREATE SCHEMA salon_appointment_db;

SET search_path TO salon_appointment_db;

-- salon TABLE
/* {
    id: 1,
    name: 'My salon 1',
    location: 'My salon Location 1',
} */

CREATE TABLE salon_appointment_db.salons (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL
);

INSERT INTO salon_appointment_db.salons (name, location) VALUES
  ('My salon 1', 'Location for salon 1'),
  ('My salon 2', 'Location for salon 2');

-- service TABLE
/* {
    id: 1,
    salon_id: 2,
    name: 'Service 1',
    price: 150,
}, */

CREATE TABLE salon_appointment_db.services (
  id SERIAL PRIMARY KEY,
  salon_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  FOREIGN KEY (salon_id) REFERENCES salon_appointment_db.salons(id) ON DELETE CASCADE
);

INSERT INTO salon_appointment_db.services (salon_id, name, price) VALUES
  (2, 'Service 1', 150),
  (1, 'Service 2', 175);

-- appointment TABLE
/* {
  id: 1,
  service_id: 1,
  customerName: 'Xavier',
  appointmentTime: 200,
} */

CREATE TABLE salon_appointment_db.appointments (
  id SERIAL PRIMARY KEY,
  service_id INTEGER NOT NULL,
  customerName TEXT NOT NULL,
  appointmentTime NUMERIC(10, 2) NOT NULL,
  isDeleted BOOLEAN NOT NULL,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

INSERT INTO salon_appointment_db.appointments (service_id, customerName, appointmentTime, isDeleted) VALUES
  (1, 'Xavier', 200, false),
  (2, 'Mabel', 300, false);
