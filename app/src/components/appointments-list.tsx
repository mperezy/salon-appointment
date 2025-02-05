import { useEffect, useState } from 'react';

export default () => {
  const [ appointments, setAppointments ] = useState<Appointment[]>();

  useEffect(() => {
    fetch('http://localhost:4000/appointments')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Could not get appointments');
        }

        return res.json();
      })
      .then((response) => {
        setAppointments(response);
      })
      .catch((error) => {
        console.error({error});
      });
  }, []);

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <span>This is the appointment list</span>
      {appointments && appointments.map(({id, customerName}) => (
        <span>{`Appointment [${id}]: ${customerName}`}</span>))}
    </div>
  );
}
