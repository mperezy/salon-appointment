import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { IconContext } from 'react-icons';
import { RouterProvider } from 'react-router';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import router from 'router';

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_API_URI}/graphql`,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <IconContext.Provider value={{ size: '1.15rem' }}>
        <MantineProvider defaultColorScheme='dark'>
          <RouterProvider router={router} />
        </MantineProvider>
      </IconContext.Provider>
    </ApolloProvider>
  </StrictMode>
);
