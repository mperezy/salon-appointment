import { useState } from 'react';
import updateAppointment from 'services/update-appointment';

export default (): UseUpdateAppointmentResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<AppointmentUpdateForm>();

  const mutation = async (data: AppointmentUpdateForm) => {
    setLoading(true);

    return updateAppointment(data)
      .then((response) => {
        setAppointment(response);

        return response;
      })
      .catch((error) =>
        // eslint-disable-next-line no-console
        console.log('**** Need to handle errors for [PATCH] /api/appointments', { error })
      )
      .finally(() => setLoading(false));
  };

  return {
    loading,
    appointment,
    mutation,
  };
};
