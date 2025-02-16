import type { ReactNode } from 'react';
import type { ModalProps } from '@mantine/core';
import { Box } from '@mantine/core';
import { Flex } from '@mantine/core';
import { Modal, Title } from '@mantine/core';

type Props = ModalProps & {
  title: string;
  children: ReactNode;
};

export default ({ title, children, ...props }: Props) => (
  <Modal
    {...props}
    closeOnClickOutside={false}
    centered
    title={
      <Flex p='sm'>
        <Title order={2}>{title}</Title>
      </Flex>
    }
  >
    <Box p='1rem 2.5rem 2.5rem'>{children}</Box>
  </Modal>
);
