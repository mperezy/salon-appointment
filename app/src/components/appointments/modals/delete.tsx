import { ModalProps } from 'react-responsive-modal';
import Modal from 'components/modal';
import useDeleteAppointment from 'hooks/use-delete-appointment';

type Props = ModalProps & {
  appointmentId: number;
  refetch: () => Promise<void>;
  customerName: string;
};

export default ({ appointmentId, customerName, refetch, ...props }: Props) => {
  const { mutation } = useDeleteAppointment();

  const handleNoButton = () => props.onClose();

  const handleYesButton = async () => {
    await mutation(appointmentId);
    await refetch();
    props.onClose();
  };

  return (
    <Modal {...props} title='Delete Appointment'>
      <div style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
        <div>Are you sure want to delete this appointment for customer "{customerName}" ?</div>

        <div style={{ display: 'flex', columnGap: '.75rem', alignSelf: 'flex-end' }}>
          <button style={{ backgroundColor: 'grey' }} onClick={handleNoButton}>
            No
          </button>
          <button style={{ backgroundColor: 'red' }} onClick={handleYesButton}>
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
};
