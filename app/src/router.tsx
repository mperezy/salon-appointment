import { createBrowserRouter } from 'react-router';
import App from 'app';
import Appointments from 'components/appointments';

export default createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/appointments',
    element: <Appointments />,
  },
]);
