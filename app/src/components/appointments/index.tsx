import { useState } from 'react';
import { Link } from 'react-router';
import {
  MdListAlt,
  MdOutlineAdd,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineHome,
} from 'react-icons/md';
import { Box, Button, Flex, Stack, Title, Text, List, Loader } from '@mantine/core';
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
    <Box h='100vh' py='xl'>
      <Stack h='100%'>
        <Flex>
          <Button id='button' component={Link} to='/' leftSection={<MdOutlineHome />}>
            Go home
          </Button>
        </Flex>

        <Flex columnGap='1rem' align='center' justify='center'>
          <MdListAlt size='5rem' />
          <Title order={2} style={{ fontSize: '3rem' }}>
            Appointments
          </Title>
        </Flex>

        <Flex justify='flex-end'>
          <Button
            color='green'
            onClick={() => handleModal({ modal: 'create' })}
            leftSection={<MdOutlineAdd />}
          >
            Create new appointment
          </Button>
        </Flex>

        <Stack h='100%' my='2rem' gap='1.5rem' style={{ overflowY: 'auto' }}>
          {loading && (
            <Flex h='100%' columnGap='xs' align='center' justify='center'>
              <Loader size='sm' />
              <Text>Fetching appointments...</Text>
            </Flex>
          )}

          {appointments &&
            appointments.map(({ id, customerName, services }) => (
              <Flex key={id} columnGap='1.5rem' justify='center' align='flex-start'>
                <Stack align='flex-start'>
                  <Text>{`Appointment [${id}] for client: ${customerName}`}</Text>

                  <Stack ml='.7rem' align='flex-start'>
                    <span>Services:</span>

                    <List pl='2rem'>
                      {services.map(({ id, name, price, salons }) => (
                        <List.Item key={id}>
                          {name} for ${price} at{' '}
                          {salons.map(({ name, location }) => `${name} - ${location}`).join(', ')}
                        </List.Item>
                      ))}
                    </List>
                  </Stack>
                </Stack>

                <Flex columnGap='.5rem' align='center'>
                  <Button
                    color='yellow'
                    onClick={() => handleModal({ modal: 'edit', appointmentId: id })}
                    leftSection={<MdOutlineEdit />}
                  >
                    Edit
                  </Button>

                  <Button
                    color='red'
                    onClick={() => handleModal({ modal: 'delete', appointmentId: id })}
                    leftSection={<MdOutlineDelete />}
                  >
                    Delete
                  </Button>
                </Flex>
              </Flex>
            ))}
        </Stack>

        {modalCreateOpen && (
          <AppointmentModal.Create
            opened={modalCreateOpen}
            refetch={async () => {
              await refetch();
            }}
            onClose={() => handleModal({ modal: 'create', open: false })}
          />
        )}

        {modalEditOpen && (
          <AppointmentModal.Edit
            appointmentId={appointmentId}
            opened={modalEditOpen}
            refetch={async () => {
              await refetch();
            }}
            onClose={() => handleModal({ modal: 'edit', open: false })}
          />
        )}

        {modalDeleteOpen && appointments && (
          <AppointmentModal.Delete
            appointmentId={appointmentId}
            opened={modalDeleteOpen}
            refetch={async () => {
              await refetch();
            }}
            customerName={appointments.find(({ id }) => id === appointmentId)?.customerName ?? ''}
            onClose={() => handleModal({ modal: 'delete', open: false })}
          />
        )}
      </Stack>
    </Box>
  );
};
