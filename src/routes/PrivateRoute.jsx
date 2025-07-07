// src/routes/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // Not logged in? Redirect to login
  if (!user) return <Navigate to="/" replace />;
  
  return children;
};

export default PrivateRoute;
