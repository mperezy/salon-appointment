import useUpdateAppointmentGraphql from 'hooks/graphql/use-update-appointment';
import useUpdateAppointmentRest from 'hooks/rest/use-update-appointment';

const USE_GRAPHQL = import.meta.env.VITE_USE_GRAPHQL === 'true';

export default (): UseUpdateAppointmentResult => {
  if (USE_GRAPHQL) {
    return useUpdateAppointmentGraphql();
  }

  return useUpdateAppointmentRest();
};
