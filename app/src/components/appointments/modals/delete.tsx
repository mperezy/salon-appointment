import { ModalProps } from 'react-responsive-modal';
import Modal from 'components/modal';

type Props = ModalProps & {
  appointmentId: number;
};

export default ({ appointmentId, ...props }: Props) => (
  <Modal {...props} title='Delete Appointment'>
    <div>Delete modal for Appointment {appointmentId}</div>
  </Modal>
);
