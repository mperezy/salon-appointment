import { useMutation } from '@apollo/client';
import type { Mutation } from 'graphql-generated/graphql';
import mutations from 'hooks/graphql/mutations';

export default (): UseDeleteAppointmentResult => {
  const [mutation, { data, loading }] = useMutation<Mutation>(
    mutations.APPOINTMENT_SOFT_DELETE_MUTATION
  );

  const handleMutation = (id: number) =>
    mutation({
      variables: {
        id,
      },
    });

  return {
    loading,
    appointment: data?.softDeleteAppointment,
    mutation: handleMutation,
  };
};
