import { useEffect, useState } from 'react';
import type { ModalProps } from 'react-responsive-modal';
import Modal from 'components/modal';
import useServices from 'hooks/use-services';
import useCreateAppointment from 'hooks/use-create-appointment';
import useUpdateAppointment from 'hooks/use-update-appointment';
import useAppointments from 'hooks/use-appointments';

type Props = ModalProps & {
  appointmentId: number;
  refetch: () => Promise<void>;
  isCreate?: boolean;
};

const defaultForm: Omit<AppointmentForm, 'service_id'> = {
  customerName: '',
  appointmentTime: -1,
};

export default ({ appointmentId, refetch, isCreate, ...props }: Props) => {
  const { services, loading } = useServices();
  const { appointments } = useAppointments({
    params: isCreate ? undefined : { id: String(appointmentId) },
    options: {
      enabled: !isCreate,
    },
  });
  const { mutation } = useCreateAppointment();
  const { mutation: updateMutation } = useUpdateAppointment();
  const [form, setForm] = useState<Omit<AppointmentForm, 'service_id'>>(defaultForm);
  const [service, setService] = useState<string>('-1');
  const servicePrice = services?.find(({ id }) => id === Number(service))?.price;

  const handleSubmit = async () => {
    if (form.customerName || form.appointmentTime !== -1) {
      if (isCreate) {
        const { appointmentTime, customerName } = form;

        const appointmentCreated = await mutation({
          customerName,
          appointmentTime,
          service_id: Number(service),
        });

        // eslint-disable-next-line no-console
        console.log({ appointmentCreated });
      } else {
        const { appointmentTime, customerName } = form;

        const appointmentUpdated = await updateMutation({
          id: appointmentId,
          customerName,
          appointmentTime,
          service_id: Number(service),
        });

        // eslint-disable-next-line no-console
        console.log({ appointmentUpdated });
      }

      await refetch();
      props.onClose();
    }
  };

  useEffect(() => {
    if (!isCreate && appointments && appointments.length > 0) {
      setForm({
        customerName: appointments[0].customerName ?? '',
        appointmentTime: appointments[0].appointmentTime ?? -1,
      });

      setService(appointments[0].services?.[0].id.toString());
    }
  }, [appointments, isCreate]);

  return (
    <Modal {...props} title={`${isCreate ? 'Create' : 'Edit'} Appointment`}>
      {loading && <span>Loading services</span>}

      {services && (
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: '.75rem' }}>
          <label style={{ display: 'flex', columnGap: '.5rem', alignItems: 'center' }}>
            <b>Customer name:</b>
            <input
              type='text'
              value={form?.customerName}
              onChange={({ currentTarget: { value } }) =>
                setForm((prevState) => ({
                  ...prevState,
                  customerName: value,
                }))
              }
            />
          </label>

          <label style={{ display: 'flex', columnGap: '.5rem', alignItems: 'center' }}>
            <b>time:</b>
            <input
              type='number'
              min={1}
              value={form.appointmentTime === -1 ? '' : form.appointmentTime}
              onChange={({ currentTarget: { value } }) =>
                setForm((prevState) => ({
                  ...prevState,
                  appointmentTime: Number(value),
                }))
              }
            />
          </label>

          <label style={{ display: 'flex', columnGap: '.5rem', alignItems: 'center' }}>
            <b>Service:</b>
            <select value={service} onChange={({ currentTarget: { value } }) => setService(value)}>
              <option value='-1'>Select a service</option>

              {services.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: 'flex', columnGap: '.5rem', alignItems: 'center' }}>
            <b>Price:</b> {servicePrice ? `$${servicePrice}` : '-- No service selected --'}
          </label>

          <button
            style={{ alignSelf: 'flex-end', backgroundColor: '#325A85' }}
            onClick={handleSubmit}
          >
            {isCreate ? 'Create' : 'Save'}
          </button>
        </div>
      )}
    </Modal>
  );
};
