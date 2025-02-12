import { useMutation } from '@apollo/client';
import type { Mutation } from 'graphql-generated/graphql';
import mutations from 'hooks/graphql/mutations';

export default (): UseUpdateAppointmentResult => {
  const [mutation, { data, loading }] = useMutation<Mutation>(
    mutations.APPOINTMENT_UPDATE_MUTATION
  );

  const handleMutation = (data: AppointmentUpdateForm) => mutation({ variables: data });

  return {
    loading,
    appointment: data?.updateAppointment,
    mutation: handleMutation,
  };
};
