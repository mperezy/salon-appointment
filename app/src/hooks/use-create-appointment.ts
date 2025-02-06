import { useState } from 'react';
import createAppointment from 'services/create-appointment';

export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [appointment, setAppointment] = useState<Appointment>();

  const mutation = async (data: AppointmentForm) => {
    setLoading(true);

    return createAppointment(data).then((response) => {
      setAppointment(response);

      return response;
    });
  };

  return {
    loading,
    appointment,
    mutation,
  };
};
