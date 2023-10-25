import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthHook } from '../hooks/useAuthHook';

export const ProtectedRoute = () => {
  const authHook = useAuthHook();

  useEffect(() => {
    const init = async () => {
      await authHook.refreshAuth();
    };
    init(); 
  }, []);

  if (!authHook.isLoggedIn()) {
    return <Navigate to="/login" />
  }

  return <Outlet />
};
