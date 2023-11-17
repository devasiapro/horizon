import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { AuthContext } from './context/AuthContext';
import { IsGlobalLoadingContext } from './context/IsGlobalLoadingContext';
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
import { CustomerContract } from './pages/CustomerContract';
import { CustomerIntegration } from './pages/CustomerIntegration';
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
      {
        path: '/customer/:customerId/contract',
        element: <CustomerContract />
      },
      {
        path: '/customer/:customerId/integration',
        element: <CustomerIntegration />
      }
    ]
  }
]);

const App = () => {
  const [auth, setAuth] = useState({
    user: null,
    token: null
  });

  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  return (
    <ChakraProvider theme={MyTheme}>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <IsGlobalLoadingContext.Provider value={{ isGlobalLoading, setIsGlobalLoading }}>
          <RouterProvider router={router} />
        </IsGlobalLoadingContext.Provider>
      </AuthContext.Provider>
    </ChakraProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
