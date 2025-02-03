import { createBrowserRouter } from 'react-router';
import Appointments from 'components/appointments'

export default () => {
    return createBrowserRouter([
        {
            path: '/appointments',
            element: <Appointments />,
        },
        // {
        //     path: ''
        // }
    ])
};