// src/pages/Dashboard.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LogoutButton from '@/components/LogoutButton';

const Dashboard = () => {
  const { user } = useAuth();

  // 🔒 Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sand text-black font-ubuntu p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard, {user.user_metadata?.username || 'Tribe Member'}!</h1>
      <p className="mb-6 text-lg text-gray-700">
        You're now logged in and protected by the spirit of the Jungle.
      </p>
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
