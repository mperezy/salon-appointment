import useDeleteAppointmentGraphql from 'hooks/graphql/use-delete-appointment';
import useDeleteAppointmentRest from 'hooks/rest/use-delete-appointment';

const USE_GRAPHQL = import.meta.env.VITE_USE_GRAPHQL === 'true';

export default (): UseDeleteAppointmentResult => {
  if (USE_GRAPHQL) {
    return useDeleteAppointmentGraphql();
  }

  return useDeleteAppointmentRest();
};
