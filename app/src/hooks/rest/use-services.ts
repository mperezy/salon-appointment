import { useEffect, useState } from 'react';
import getServices from 'services/get-services';

export default (): UseServicesResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [services, setServices] = useState<Service[]>();

  useEffect(() => {
    getServices()
      .then((services) => {
        setServices(services);
      })
      .catch((error) =>
        // eslint-disable-next-line no-console
        console.log('**** Need to handle errors for [GET] /api/services', { error })
      )
      .finally(() => setLoading(false));
  }, []);

  return {
    loading,
    services,
  };
};
