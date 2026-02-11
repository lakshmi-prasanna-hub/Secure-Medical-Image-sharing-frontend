import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if(!user){
    return <Navigate to="/"/>
  }

  if(requiredRole && user.role !== requiredRole){
    return <Navigate to="/unauthorized"/>
  }

  return children;
};

export default ProtectedRoute;