import useServicesGraphql from 'hooks/graphql/use-services';
import useServicesRest from 'hooks/rest/use-services';

const USE_GRAPHQL = import.meta.env.VITE_USE_GRAPHQL === 'true';

export default (): UseServicesResult => {
  if (USE_GRAPHQL) {
    return useServicesGraphql();
  }

  return useServicesRest();
};
