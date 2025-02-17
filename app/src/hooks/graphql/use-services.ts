import { useQuery } from '@apollo/client';
import type { Query } from 'graphql-generated/graphql';
import queries from 'hooks/graphql/queries';

export default (): UseServicesResult => {
  const queryState = useQuery<Query>(queries.SERVICE_AND_SALONS_QUERY_LIST, {
    fetchPolicy: 'no-cache',
  });

  return {
    ...queryState,
    services: queryState?.data?.serviceAndSalonsQueryList,
  };
};
