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

The backend was built using Nodejs with Express in order to serve a REST and GraphQL API server.
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

## REST API

- For REST API, the usage for this one is under the next endpoints:
    - Appointments: 
      - [GET] [http://localhost:4000/appointments](http://localhost:4000/appointments)
      - [GET] [http://localhost:4000/appointments?id=1](http://localhost:4000/appointments?id=1)
      - [POST | PATCH | DELETE] [http://localhost:4000/appointments](http://localhost:4000/appointments)
    - Services:
      - [GET] [http://localhost:4000/services](http://localhost:4000/services)

## GraphQL API
- For GraphQL API, it uses Prisma ORM by default since Prisma was set on the GraphQL server context.
- The server is exposed simultaneously with the REST API, the endpoint for GraphQL is:
  - [http://localhost:4000/graphql](http://localhost:4000/graphql) - This URL can be used to run the playground in the browser.
- The Queries and Mutations implemented are:
  - Queries:
    ```graphql
    type Query {
      appointmentQuery(id: Int!): appointments!
      appointmentQueryList(id: String): [appointmentList!]!
      salonQuery(id: Int!): salons!
      serviceAndSalonsQueryList: [serviceAndSalons!]!
      serviceQuery(id: Int!): services!
    }
    ```
  - Mutations:
    ```graphql
    type Mutation {
      createAppointment(appointmentTime: Float!, customerName: String!, service_id: Int!): appointments!
      recoverAppointment(id: Int!): appointments!
      softDeleteAppointment(id: Int!): appointments!
      updateAppointment(appointmentTime: Float!, customerName: String!, id: Int!, service_id: Int!): appointments!
     }
    ```
- To generate GraphQL types so the Frontend will be ready to use for useQuery or useMutations, run:
```shell
$ yarn graphql:generate
```
- These types will be created in the folder [app/src/graphql-generated/](app/src/graphql-generated/).

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

## API connection

- By default, the web app is using the REST API.
- The web app is prepared to make API requests using GraphQL,
to achieve that you only need to set a env variable:
```dotenv
VITE_API_URL=http://localhost:4000
VITE_USE_GRAPHQL=true
```
- In case you want to go back to REST API usage, just set the 
env var `VITE_USE_GRAPHQL=false` or just remove it from the dotenv file.

## Run web app

- Once you followed all steps above, just execute:

```shell
$ yarn dev
```

- The web app will be running at [http://localhost:3000](http://localhost:3000).
