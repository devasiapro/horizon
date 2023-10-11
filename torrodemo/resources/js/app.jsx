import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';

import { route } from './route';

const App = () => {
  return (
    <React.StrictMode>
      <ChakraProvider>
        <RouterProvider router={route} />
      </ChakraProvider>
    </React.StrictMode>
  );
};

if (document.getElementById('root')) {
  createRoot(document.getElementById('root')).render(<App />);
}
