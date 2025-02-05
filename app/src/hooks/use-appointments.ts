import { useEffect, useState } from 'react';
import getAppointments from 'services/get-appointments';

export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [appointments, setAppointments] = useState<Appointment[]>();

  useEffect(() => {
    getAppointments().then((appointments) => {
      setAppointments(appointments);
      setLoading(false);
    });
  }, []);

  return {
    loading,
    appointments,
  };
};
