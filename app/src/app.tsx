import { useState } from 'react';
import { Link } from 'react-router';
import { Anchor, Box, Button, Flex, Stack, Text, Title } from '@mantine/core';
import reactLogo from 'assets/react.svg';
import viteLogo from '/vite.svg';
import 'app.css';

export default () => {
  const [count, setCount] = useState(0);

  return (
    <Stack align='center' justify='center' h='100vh'>
      <Flex>
        <Anchor href='https://vite.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </Anchor>

        <Anchor href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </Anchor>
      </Flex>

      <Title style={{ fontSize: '3.5rem' }}>Vite + React</Title>

      <Box p='lg'>
        <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>

        <Text py='lg'>
          Edit <code>src/App.tsx</code> and save to test HMR
        </Text>
      </Box>

      <Anchor component={Link} to='/appointments'>
        Go to appointments
      </Anchor>

      <Text py='sm' className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </Text>
    </Stack>
  );
};
