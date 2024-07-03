import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../pages/contexts/AuthContext';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;