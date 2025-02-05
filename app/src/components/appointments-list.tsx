import useAppointments from 'hooks/use-appointments';

export default () => {
  const { appointments, loading } = useAppointments();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>This is the appointment list</span>

      {loading && <span>Fetching appointments...</span>}

      <div
        style={{ display: 'flex', flexDirection: 'column', rowGap: '1.5rem', marginTop: '2rem' }}
      >
        {appointments &&
          appointments.map(({ id, customerName, services }) => (
            <div
              key={id}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <span>{`Appointment [${id}] for client: ${customerName}`}</span>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: '.75rem',
                  alignItems: 'flex-start',
                }}
              >
                <span>Services:</span>

                <ul style={{ margin: 0 }}>
                  {services.map(({ id, name, price, salons }) => (
                    <li key={id}>
                      {name} for ${price} at{' '}
                      {salons.map(({ name, location }) => `${name} - ${location}`).join(', ')}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
