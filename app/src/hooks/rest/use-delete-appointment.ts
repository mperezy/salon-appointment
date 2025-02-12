import { useState } from 'react';
import deleteAppointment from 'services/delete-appointment';

export default (): UseDeleteAppointmentResult => {
  const [loading, setLoading] = useState<boolean>(true);

  const mutation = async (appointmentId: number) => {
    setLoading(true);

    return await deleteAppointment(appointmentId);
  };

  return {
    loading,
    mutation,
  };
};
