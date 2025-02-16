import { useState } from 'react';
import { MdOutlineSave } from 'react-icons/md';
import type { ModalProps } from '@mantine/core';
import { Button, Flex, Loader, NumberInput, Select, Text, TextInput } from '@mantine/core';
import { Stack } from '@mantine/core';
import Modal from 'components/modal';
import useServices from 'hooks/use-services';
import useCreateAppointment from 'hooks/use-create-appointment';

type Props = ModalProps & {
  refetch: () => Promise<void>;
};

const defaultForm: Omit<AppointmentForm, 'service_id'> = {
  customerName: '',
  appointmentTime: -1,
};

export default ({ refetch, ...props }: Props) => {
  const { services, loading } = useServices();
  const { mutation, loading: createLoading } = useCreateAppointment();

  const [form, setForm] = useState<Omit<AppointmentForm, 'service_id'>>(defaultForm);
  const [service, setService] = useState<string>('-1');
  const formDisabled = !form.customerName || form.appointmentTime === -1 || service === '-1';
  const servicePrice = services?.find(({ id }) => id === Number(service))?.price;

  const handleSubmit = async () => {
    if (form.customerName || form.appointmentTime !== -1) {
      const { appointmentTime, customerName } = form;

      const appointmentCreated = await mutation({
        customerName,
        appointmentTime,
        service_id: Number(service),
      });

      // eslint-disable-next-line no-console
      console.log({ appointmentCreated });

      await refetch();
      props.onClose();
    }
  };

  return (
    <Modal {...props} title='Create Appointment'>
      {loading && (
        <Flex columnGap='xs' align='center'>
          <Loader size='sm' />
          <Text>Loading services</Text>
        </Flex>
      )}

      {services && (
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
              disabled={formDisabled || createLoading}
              loading={createLoading}
              leftSection={<MdOutlineSave />}
            >
              Create
            </Button>
          </Flex>
        </Stack>
      )}
    </Modal>
  );
};
