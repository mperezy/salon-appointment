## Code Challenge for Senior Fullstack Engineer

### Code Challenge

**Task:** Build a Fullstack Application for Salon Appointment Management

You are required to build a fullstack application that allows users to manage salon appointments. This challenge evaluates your proficiency in both frontend and backend development, focusing on GraphQL, PostgreSQL, React, and TypeScript.

### Backend Requirements

- GraphQL API: Implement a GraphQL API that supports the following operations:

- Query: Fetch all appointments with their associated salon and service details.

- Mutation: Add a new appointment.

- Mutation: Update an existing appointment's details.

- Mutation: Delete an appointment.

PostgreSQL Database: Use PostgreSQL to store the appointment data. The database should include the following tables:

salons with fields: id, name, location.

services with fields: id, salon_id, name, price.

appointments with fields: id, salonId, customerName, serviceName, appointmentTime.

### Environment:

Use any Node.js framework (e.g., Express) to set up your GraphQL server.

### Frontend Requirements

React Application: Develop a simple React-based frontend that interacts with the GraphQL API.

### Features:

View Appointments: Display a list of all appointments fetched from the backend.

Add Appointment: Provide a form to create a new appointment. The form should include fields for:

Customer Name

Salon

Service

Appointment Time

Integration:

Use Apollo Client to interact with the GraphQL API.

Styling: Style the app minimally using plain CSS or a library like TailwindCSS or Material-UI.

### Constraints

You have 30 to 40 minutes to complete this challenge.

Use clean code practices and adhere to design patterns.

Do not use AI tools to generate the solution.

Submit your code in a version-controlled repository (e.g., GitHub, GitLab, or Bitbucket) and share the repository link.

Include a README file with:

Setup instructions.

Brief explanation of your approach.

# Backend

The backend was built using Nodejs with Express in order to serve a REST API server.
Typescript is the main language used.

## Install dependencies

```shell
$ cd server
$ yarn install
```

## Database

Made with Postgres

- To start Postgres server run:

```shell
$ docker compose up
```

- Database will be running in container `salon_appointment-psql` at `localhost:5432`.

- Initialize DB with:
```shell
# Replace $PG_USER with your user name
$ docker salon_appointment-psql exec -it psql -U $PG_USER -d salon_appointment -f /db-scripts/db-salon.sql
```

- Then you will need to fill up the env vars:

```dotenv
PG_HOST=localhost
PG_USER=admin
PG_PASSWORD=adnin1234
PG_DB=salon_appointment
PG_DB_SCHEMA=salon_appointment_db
```

## Using Prisma ORM (Requires Database setup from previous step)

- The server is prepared to use Prisma ORM instead Postgres Typescript package `pg`.

- First need to set the dotenv file with:

```dotenv
USE_PRISMA=true
DB_URL="postgresql://admin:admin1234@localhost:5432/salon_appointment?schema=salon_appointment_db"
```

- Then you will need to generate required types based on models from `schema.prisma` file.

```shell
$ yarn prisma:db:generate
```

- Now all actions will be executed on Prisma ORM instead of Postgres `pg` package.

## Run server

- Once you followed all steps above, just execute:

```shell
$ yarn dev
```

- The server will be running at [http://localhost:4000](http://localhost:4000).

# Frontend

The frontend was build using Vite.js with Typescript as main language.

## Install dependencies

```shell
$ yarn install
```

## Configure application

- You will need to set the dotenv file with the next:

```dotenv
VITE_API_URL=http://localhost:4000
```

## Run web app

- Once you followed all steps above, just execute:

```shell
$ yarn dev
```

- The web app will be running at [http://localhost:3000](http://localhost:3000).
