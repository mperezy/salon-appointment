import { useState } from 'react';
import AppointmentModal from 'components/appointments/modals';
import useAppointments from 'hooks/use-appointments';

type EditDeleteModal = {
  appointmentId: number;
  create: boolean;
  edit: boolean;
  delete: boolean;
};

type HandleModal = {
  modal: keyof EditDeleteModal;
  appointmentId?: number;
  open?: boolean;
};

const editDeleteModal: EditDeleteModal = {
  appointmentId: -1,
  create: false,
  edit: false,
  delete: false,
};

export default () => {
  const [
    { appointmentId, create: modalCreateOpen, edit: modalEditOpen, delete: modalDeleteOpen },
    setModalOpen,
  ] = useState<EditDeleteModal>(editDeleteModal);
  const { appointments, refetch, loading } = useAppointments({
    options: {
      enabled: true,
    },
  });

  const handleModal = ({ modal, appointmentId = -1, open = true }: HandleModal) =>
    setModalOpen((prevState) => ({ ...prevState, appointmentId, [modal]: open }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>This is the appointment list</h2>

      <div style={{ display: 'flex' }}>
        <button onClick={() => handleModal({ modal: 'create' })}>Create new appointment</button>
      </div>

      {loading && <span>Fetching appointments...</span>}

      <div
        style={{ display: 'flex', flexDirection: 'column', rowGap: '1.5rem', marginTop: '2rem' }}
      >
        {appointments &&
          appointments.map(({ id, customerName, services }) => (
            <div
              key={id}
              style={{ display: 'flex', columnGap: '1.5rem', alignItems: 'flex-start' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
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

              <div style={{ display: 'flex', columnGap: '.5rem', alignItems: 'center' }}>
                <button
                  style={{ backgroundColor: '#D1AA4D' }}
                  onClick={() => handleModal({ modal: 'edit', appointmentId: id })}
                >
                  Edit
                </button>

                <button
                  style={{ backgroundColor: '#D14141' }}
                  onClick={() => handleModal({ modal: 'delete', appointmentId: id })}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {modalCreateOpen && (
        <AppointmentModal.CreateEdit
          isCreate
          appointmentId={appointmentId}
          open={modalCreateOpen}
          refetch={refetch}
          onClose={() => handleModal({ modal: 'create', open: false })}
        />
      )}

      {modalEditOpen && (
        <AppointmentModal.CreateEdit
          appointmentId={appointmentId}
          open={modalEditOpen}
          refetch={refetch}
          onClose={() => handleModal({ modal: 'edit', open: false })}
        />
      )}

      {modalDeleteOpen && (
        <AppointmentModal.Delete
          appointmentId={appointmentId}
          open={modalDeleteOpen}
          onClose={() => handleModal({ modal: 'delete', open: false })}
        />
      )}
    </div>
  );
};
