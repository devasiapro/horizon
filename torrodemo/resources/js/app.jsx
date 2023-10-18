import './bootstrap';
import '../css/app.css';

import React, {useState} from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const authHook = useAuth();
  const [auth, setAuth] = useState({
    isSignedIn: authHook.auth.isSignedIn, 
    player: authHook.auth.player, 
    token: authHook.auth.token
  });

  return (
    <React.StrictMode>
      <AuthContext.Provider value={{auth, setAuth}}>
        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>
      </AuthContext.Provider>
    </React.StrictMode>
  );
};

if (document.getElementById('root')) {
  createRoot(document.getElementById('root')).render(<App />);
}
