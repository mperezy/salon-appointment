import type { DocumentNode } from '@apollo/client';
import { gql } from '@apollo/client';

type GraphQLQuery =
  | 'APPOINTMENT_QUERY_LIST'
  | 'SERVICE_AND_SALONS_QUERY_LIST'
  | 'APPOINTMENT_BY_ID_QUERY'
  | 'SERVICE_BY_ID_QUERY'
  | 'SALON_BY_ID_QUERY';
type GraphQLQueries = Record<GraphQLQuery, DocumentNode>;

const queries: GraphQLQueries = {
  APPOINTMENT_QUERY_LIST: gql`
    query AppointmentQueryList($id: String) {
      appointmentQueryList(id: $id) {
        id
        customerName
        appointmentTime
        services {
          id
          name
          price
          salons {
            id
            name
            location
          }
        }
      }
    }
  `,
  SERVICE_AND_SALONS_QUERY_LIST: gql`
    query ServiceAndSalonsQueryList {
      serviceAndSalonsQueryList {
        id
        name
        price
        salons {
          id
          name
          location
        }
      }
    }
  `,
  APPOINTMENT_BY_ID_QUERY: gql`
    query AppointmentByIdQuery($id: Int!) {
      appointmentQuery(id: $id) {
        id
        customerName
        appointmentTime
        isDeleted
        service_id
      }
    }
  `,
  SERVICE_BY_ID_QUERY: gql`
    query ServiceByIdQuery($id: Int!) {
      serviceQuery(id: $id) {
        id
        name
        price
      }
    }
  `,
  SALON_BY_ID_QUERY: gql`
    query SalonByIdQuery($id: Int!) {
      salonQuery(id: $id) {
        id
        name
        location
      }
    }
  `,
};

export default queries;
