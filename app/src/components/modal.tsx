import type { ReactNode } from 'react';
import type { ModalProps } from 'react-responsive-modal';
import { Modal } from 'react-responsive-modal';

type Props = ModalProps & {
  title: string;
  children: ReactNode;
};

export default ({ title, children, ...props }: Props) => (
  <Modal
    {...props}
    closeOnOverlayClick={false}
    center
    styles={{
      root: {
        color: '#242424',
      },
      modal: {
        borderRadius: '.75rem',
        padding: '1rem 2.5rem 2.5rem',
      },
    }}
  >
    <h2>{title}</h2>
    {children}
  </Modal>
);
