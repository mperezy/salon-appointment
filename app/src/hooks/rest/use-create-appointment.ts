import { useState } from 'react';
import createAppointment from 'services/create-appointment';

export default (): UseCreateAppointmentResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [appointment, setAppointment] = useState<Appointment>();

  const mutation = async (data: AppointmentForm) => {
    setLoading(true);

    return createAppointment(data)
      .then((response) => {
        setAppointment(response);

        return response;
      })
      .catch((error) =>
        // eslint-disable-next-line no-console
        console.log('**** Need to handle errors for [DELETE] /api/appointments', { error })
      )
      .finally(() => setLoading(false));
  };

  return {
    loading,
    appointment,
    mutation,
  };
};
