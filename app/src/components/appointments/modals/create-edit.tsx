import { useEffect, useState } from 'react';
import { MdOutlineSave } from 'react-icons/md';
import type { ModalProps } from '@mantine/core';
import { Button, Flex, Loader, NumberInput, Select, Text, TextInput } from '@mantine/core';
import { Stack } from '@mantine/core';
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
  const { mutation, loading: createLoading } = useCreateAppointment();
  const { mutation: updateMutation, loading: updateLoading } = useUpdateAppointment();
  const createEditLoading = createLoading || updateLoading;

  const [form, setForm] = useState<Omit<AppointmentForm, 'service_id'>>(defaultForm);
  const [service, setService] = useState<string>('-1');
  const formDisabled = !form.customerName || form.appointmentTime === -1 || service === '-1';
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
              disabled={formDisabled}
              loading={createEditLoading}
              leftSection={<MdOutlineSave />}
            >
              {isCreate ? 'Create' : 'Save'}
            </Button>
          </Flex>
        </Stack>
      )}
    </Modal>
  );
};
