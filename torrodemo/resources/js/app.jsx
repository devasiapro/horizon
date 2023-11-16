import './bootstrap';
import '../css/app.css';

import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RouteRequest from './RouteRequest';
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
      <BrowserRouter>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <ChakraProvider>
            <Routes>
              <Route path="/*" element={<RouteRequest />}></Route>
            </Routes>
          </ChakraProvider>
        </AuthContext.Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

if (document.getElementById('root')) {
  createRoot(document.getElementById('root')).render(<App />);
}
