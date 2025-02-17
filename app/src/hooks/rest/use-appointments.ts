import { useCallback, useEffect, useState } from 'react';
import getAppointments from 'services/get-appointments';

type Props = {
  params?: Record<string, string | number>;
  options: {
    enabled?: boolean;
  };
};

export default ({ params, options: { enabled = true } }: Props): UseAppointmentsResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [appointments, setAppointments] = useState<Appointment[]>();

  const refetch = useCallback(
    () =>
      getAppointments(params)
        .then((appointments) => setAppointments(appointments))
        .catch((error) =>
          // eslint-disable-next-line no-console
          console.log('**** Need to handle errors for [GET] /api/appointments', { error })
        )
        .finally(() => setLoading(false)),
    [params]
  );

  useEffect(() => {
    if (enabled) {
      refetch().then();
    }
  }, []);

  return {
    loading,
    refetch,
    appointments,
  };
};
