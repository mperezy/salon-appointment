import useCreateAppointmentGraphql from 'hooks/graphql/use-create-appointment';
import useCreateAppointmentRest from 'hooks/rest/use-create-appointment';

const USE_GRAPHQL = import.meta.env.VITE_USE_GRAPHQL === 'true';

export default (): UseCreateAppointmentResult => {
  if (USE_GRAPHQL) {
    return useCreateAppointmentGraphql();
  }

  return useCreateAppointmentRest();
};
