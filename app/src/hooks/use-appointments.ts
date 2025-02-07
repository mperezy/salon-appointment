import { useCallback, useEffect, useState } from 'react';
import getAppointments from 'services/get-appointments';

type Props = {
  params?: Record<string, string | number>;
  options: {
    enabled?: boolean;
  };
};

export default ({ params, options }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [appointments, setAppointments] = useState<Appointment[]>();

  const refetch = useCallback(
    () =>
      getAppointments(params).then((appointments) => {
        setAppointments(appointments);
        setLoading(false);
      }),
    []
  );

  useEffect(() => {
    if (options.enabled) {
      refetch().then();
    }
  }, []);

  return {
    loading,
    refetch,
    appointments,
  };
};
