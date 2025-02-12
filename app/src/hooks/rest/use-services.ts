import { useEffect, useState } from 'react';
import getServices from 'services/get-services';

export default (): UseServicesResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [services, setServices] = useState<Service[]>();

  useEffect(() => {
    getServices().then((services) => {
      setServices(services);
      setLoading(false);
    });
  }, []);

  return {
    loading,
    services,
  };
};
