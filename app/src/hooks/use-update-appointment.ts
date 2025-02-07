import { useState } from 'react';
import updateAppointment from 'services/update-appointment';

export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [appointment, setAppointment] = useState<AppointmentUpdateForm>();

  const mutation = async (data: AppointmentUpdateForm) => {
    setLoading(true);

    return updateAppointment(data).then((response) => {
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
