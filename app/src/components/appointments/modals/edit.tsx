import { useEffect, useState } from 'react';
import { MdOutlineSave } from 'react-icons/md';
import type { ModalProps } from '@mantine/core';
import { Button, Flex, Loader, NumberInput, Select, Text, TextInput } from '@mantine/core';
import { Stack } from '@mantine/core';
import Modal from 'components/modal';
import useServices from 'hooks/use-services';
import useUpdateAppointment from 'hooks/use-update-appointment';
import useAppointments from 'hooks/use-appointments';

type Props = ModalProps & {
  appointmentId: number;
  refetch: () => Promise<void>;
};

const defaultForm: Omit<AppointmentForm, 'service_id'> = {
  customerName: '',
  appointmentTime: -1,
};

export default ({ appointmentId, refetch, ...props }: Props) => {
  const { services, loading: loadingServices } = useServices();
  const { appointments, loading: loadingAppointments } = useAppointments({
    params: { id: String(appointmentId) },
    options: { enabled: true },
  });
  const loading = loadingAppointments || loadingServices;
  const { mutation: updateMutation, loading: updateLoading } = useUpdateAppointment();

  const [form, setForm] = useState<Omit<AppointmentForm, 'service_id'>>(defaultForm);
  const [service, setService] = useState<string>('-1');
  const formDisabled = !form.customerName || form.appointmentTime === -1 || service === '-1';
  const servicePrice = services?.find(({ id }) => id === Number(service))?.price;

  const handleSubmit = async () => {
    if (form.customerName || form.appointmentTime !== -1) {
      const { appointmentTime, customerName } = form;

      const appointmentUpdated = await updateMutation({
        id: appointmentId,
        customerName,
        appointmentTime,
        service_id: Number(service),
      });

      // eslint-disable-next-line no-console
      console.log({ appointmentUpdated });

      await refetch();
      props.onClose();
    }
  };

  useEffect(() => {
    if (appointments && appointments.length > 0) {
      setForm({
        customerName: appointments[0].customerName ?? '',
        appointmentTime: appointments[0].appointmentTime ?? -1,
      });

      setService(appointments[0].services?.[0].id.toString());
    }
  }, [appointments]);

  return (
    <Modal {...props} title='Edit Appointment'>
      {loading && (
        <Flex columnGap='xs' align='center'>
          <Loader size='sm' />
          <Text>Loading appointment and services...</Text>
        </Flex>
      )}

      {services && appointments && (
        <Stack gap='.75rem'>
          <TextInput
            label='Customer name:'
            placeholder="Enter the customer's name..."
            value={form?.customerName}
            onChange={({ currentTarget: { value } }) =>
              setForm((prevState) => ({
                ...prevState,
                customerName: value,
              }))
            }
          />

          <NumberInput
            hideControls
            label='Time:'
            placeholder='Enter duration of appointment in minutes...'
            min={1}
            value={form.appointmentTime === -1 ? '' : form.appointmentTime}
            onChange={(value) =>
              setForm((prevState) => ({
                ...prevState,
                appointmentTime: Number(value),
              }))
            }
          />

          <Select
            label='Service:'
            placeholder='Select a service'
            data={services.map(({ id, name }) => ({ value: String(id), label: name }))}
            onChange={(value) => value && setService(value)}
          />

          <TextInput
            disabled
            label='Price:'
            value={servicePrice ? `$${servicePrice}` : '-- No service selected --'}
          />

          <Flex w='100%' justify='flex-end'>
            <Button
              color='#325A85'
              onClick={handleSubmit}
              disabled={formDisabled || updateLoading}
              loading={updateLoading}
              leftSection={<MdOutlineSave />}
            >
              Save
            </Button>
          </Flex>
        </Stack>
      )}
    </Modal>
  );
};
