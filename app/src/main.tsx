import { useEffect, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router';
import App from './App.tsx'
import router from './routes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <RouterProvider router={router} /> */}
  </StrictMode>,
);
