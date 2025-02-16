import type { ModalProps } from '@mantine/core';
import { Text } from '@mantine/core';
import { Flex } from '@mantine/core';
import { Stack } from '@mantine/core';
import { Button } from '@mantine/core';
import Modal from 'components/modal';
import useDeleteAppointment from 'hooks/rest/use-delete-appointment';

type Props = ModalProps & {
  appointmentId: number;
  refetch: () => Promise<void>;
  customerName: string;
};

export default ({ appointmentId, customerName, refetch, ...props }: Props) => {
  const { mutation, loading } = useDeleteAppointment();
  const handleNoButton = () => props.onClose();

  const handleYesButton = async () => {
    await mutation(appointmentId);
    await refetch();
    props.onClose();
  };

  return (
    <Modal {...props} title='Delete Appointment'>
      <Stack gap='1rem'>
        <Text>Are you sure want to delete this appointment for customer "{customerName}" ?</Text>

        <Flex w='100%' columnGap='.75rem' justify='flex-end'>
          <Button color='gray' onClick={handleNoButton} disabled={loading}>
            No
          </Button>

          <Button color='red' onClick={handleYesButton} disabled={loading} loading={loading}>
            Yes
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
};
