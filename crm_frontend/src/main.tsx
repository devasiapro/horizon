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
      }
    ]
  }
]);

const App = () => {
  const [auth, setAuth] = useState({
    user: null,
    token: null
  });

  return (
    <React.StrictMode>
      <ChakraProvider theme={MyTheme}>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      </ChakraProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
