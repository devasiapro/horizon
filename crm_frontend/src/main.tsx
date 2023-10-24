import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { Home } from './pages/Home.tsx';
import { Login } from './pages/Login.tsx';
import { MyTheme } from "./theme/MyTheme.js";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={MyTheme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
