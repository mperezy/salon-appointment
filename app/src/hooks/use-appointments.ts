import { useEffect, useState } from 'react';
import getAppointments from 'services/get-appointments';

export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [appointments, setAppointments] = useState<Appointment[]>();

  const refetch = () =>
    getAppointments().then((appointments) => {
      setAppointments(appointments);
      setLoading(false);
    });

  useEffect(() => {
    refetch().then();
  }, []);

  return {
    loading,
    refetch,
    appointments,
  };
};
