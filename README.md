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