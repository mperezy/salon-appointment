import { useEffect, useState, } from 'react';

export default () => {
    const [appointments, setAppointments] = useState();

    useEffect(() => {
        fetch('http://localhost:4000/appointments')
        .then((res) => {
            if (!res.ok) {
                throw new Error('Could not get appointments');
            }

            return res.json();
        })
        .then((response) => {
            setAppointments(appointments);
            console.log({ response });
        })
        .catch((error) => {
            console.error({ error });
        });
    }, []);

    return (<div>This is the appointments list</div>);
}