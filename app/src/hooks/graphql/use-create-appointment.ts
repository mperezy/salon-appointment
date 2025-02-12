import { useMutation } from '@apollo/client';
import type { Mutation } from 'graphql-generated/graphql';
import mutations from 'hooks/graphql/mutations';

export default (): UseCreateAppointmentResult => {
  const [mutation, { data, loading }] = useMutation<Mutation>(
    mutations.APPOINTMENT_CREATE_MUTATION
  );

  const handleMutation = (data: AppointmentForm) => mutation({ variables: data });

  return {
    loading,
    appointment: data?.createAppointment,
    mutation: handleMutation,
  };
};
