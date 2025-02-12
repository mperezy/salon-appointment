import type { DocumentNode } from '@apollo/client';
import { gql } from '@apollo/client';

type GraphQLMutation =
  | 'APPOINTMENT_CREATE_MUTATION'
  | 'APPOINTMENT_UPDATE_MUTATION'
  | 'APPOINTMENT_SOFT_DELETE_MUTATION'
  | 'APPOINTMENT_RECOVER_MUTATION';
type GraphQLMutations = Record<GraphQLMutation, DocumentNode>;

const mutations: GraphQLMutations = {
  APPOINTMENT_CREATE_MUTATION: gql`
    mutation CreateAppointment(
      $customerName: String!
      $appointmentTime: Float!
      $service_id: Int!
    ) {
      createAppointment(
        customerName: $customerName
        appointmentTime: $appointmentTime
        service_id: $service_id
      ) {
        id
      }
    }
  `,
  APPOINTMENT_UPDATE_MUTATION: gql`
    mutation UpdateAppointment(
      $id: Int!
      $customerName: String!
      $appointmentTime: Float!
      $service_id: Int!
    ) {
      updateAppointment(
        id: $id
        customerName: $customerName
        appointmentTime: $appointmentTime
        service_id: $service_id
      ) {
        id
      }
    }
  `,
  APPOINTMENT_SOFT_DELETE_MUTATION: gql`
    mutation SoftDeleteAppointment($id: Int!) {
      softDeleteAppointment(id: $id) {
        id
      }
    }
  `,
  APPOINTMENT_RECOVER_MUTATION: gql`
    mutation RecoverAppointment($id: Int!) {
      recoverAppointment(id: $id) {
        id
      }
    }
  `,
};

export default mutations;
