import { useQuery } from '@apollo/client';
import type { Query } from 'graphql-generated/graphql';
import queries from 'hooks/graphql/queries';

export default (id: string | null = null, enabled?: boolean): UseAppointmentsResult => {
  const queryState = useQuery<Query>(queries.APPOINTMENT_QUERY_LIST, {
    skip: enabled,
    variables: {
      id,
    },
  });

  return {
    ...queryState,
    appointments: queryState?.data?.appointmentQueryList,
  };
};
