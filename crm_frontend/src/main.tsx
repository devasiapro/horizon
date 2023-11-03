import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { AuthContext } from './context/AuthContext';
import { Layout } from './pages/Layout';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { CustomerList } from './pages/CustomerList';
import { CustomerAdd } from './pages/CustomerAdd';
import { CustomerAddSeamless } from './pages/CustomerAddSeamless';
import { CustomerAddTransfer } from './pages/CustomerAddTransfer';
import { CustomerEdit } from './pages/CustomerEdit';
import { CustomerView } from './pages/CustomerView';
import { MyTheme } from "./theme/MyTheme";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  { path: '/',
    element: (
      <ProtectedRoute />
    ),
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/customer',
        element: <CustomerList />
      },
      {
        path: '/customer/add',
        element: <CustomerAdd />
      },
      {
        path: '/customer/:customerId',
        element: <CustomerView />
      },
      {
        path: '/customer/:customerId/edit',
        element: <CustomerEdit />
      },
    ]
  }
]);

const App = () => {
  const [auth, setAuth] = useState({
    user: null,
    token: null
  });

  return (
    <ChakraProvider theme={MyTheme}>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </ChakraProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
