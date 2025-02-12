import useAppointmentsGraphql from 'hooks/graphql/use-appointments';
import useAppointmentsRest from 'hooks/rest/use-appointments';

type Props = {
  params?: Record<'id', string>;
  options: {
    enabled?: boolean;
  };
};

const USE_GRAPHQL = import.meta.env.VITE_USE_GRAPHQL === 'true';

export default ({ params, options: { enabled = true } }: Props): UseAppointmentsResult => {
  if (USE_GRAPHQL) {
    return useAppointmentsGraphql(params?.id ?? null, !enabled);
  }

  return useAppointmentsRest({ params, options: { enabled } });
};
