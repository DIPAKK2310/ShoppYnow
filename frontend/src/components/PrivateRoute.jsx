import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Check if the user is authenticated and has the 'admin' role
  const isAuthenticated = token && role === 'admin';

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Render the child routes if authenticated
  return <Outlet />;
};

export default PrivateRoute;
